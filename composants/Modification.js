import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Modification = ({ route }) => {

    const [prenom, setPrenom] = useState(route.params.prenom);
    const [nom, setNom] = useState(route.params.nom);
    const [numCell, setNumCell] = useState(route.params.numCell);
    const [numProf, setNumProf] = useState(route.params.numProf);
    const [email, setEmail] = useState(route.params.email);
    const [photo, setPhoto] = useState(route.params.photo);
    const [defaultNum, setDefaultNum] = useState(route.params.defaultNum);
    const [erreurs, setErreurs] = useState({});
    const navigation = useNavigation();


    const valider = () => {
        const tempsErreurs = {};

        if (nom === "") {
            tempsErreurs.erreurNom = "Le nom ne peut pas être vide";
        }
        if (prenom === "") {
            tempsErreurs.erreurPrenom = "Le prenom ne peut pas être vide";
        }
        if (numCell === "") {
            tempsErreurs.erreurNumCell = "Le numéro de téléphone ne peut pas être vide";
        }
        if (numProf === "") {
            tempsErreurs.erreurNumProf = "Le numéro de téléphone professionnel ne peut pas être vide";
        }
        if (email === "") {
            tempsErreurs.erreurEmail = "L'email ne peut pas être vide";
        }

        setErreurs(tempsErreurs);

        return Object.keys(tempsErreurs).length === 0;
    };

    const soumettre = () => {
        if (valider()) {
            navigation.popToTop();
            navigation.navigate('Accueil', {
                updatedContact: {
                    id: route.params.id,
                    nom,
                    prenom,
                    numCell,
                    numProf,
                    email,
                    photo,
                    defaultNum,
                }
            });
        } else {
            console.log("Le formulaire n'est pas valide");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier un contact</Text>
            <TextInput style={styles.input} placeholder="Prenom" value={prenom} onChangeText={setPrenom} />
            {erreurs.erreurPrenom && <Text style={styles.erreur}>{erreurs.erreurPrenom}</Text>}
            <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
            {erreurs.erreurNom && <Text style={styles.erreur}>{erreurs.erreurNom}</Text>}
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Numéro de téléphone" value={numCell} onChangeText={setNumCell} />
            {erreurs.erreurNumCell && <Text style={styles.erreur}>{erreurs.erreurNumCell}</Text>}
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Numéro de téléphone Profésionnel" value={numProf} onChangeText={setNumProf} />
            {erreurs.erreurNumProf && <Text style={styles.erreur}>{erreurs.erreurNumProf}</Text>}
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            {erreurs.erreurEmail && <Text style={styles.erreur}>{erreurs.erreurEmail}</Text>}
            <TextInput style={styles.input} placeholder="photo" value={photo} onChangeText={setPhoto} />

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Numéro par défaut: {defaultNum === "numCell" ? "Cellulaire" : "Professionnel"}</Text>
                <Switch
                    value={defaultNum === "numCell"}
                    onValueChange={(value) => setDefaultNum(value ? "numCell" : "numProf")}
                />
            </View>

            <Button title="Modifier" onPress={soumettre} color="#f4511e" />

        </View>
    );
};

export default Modification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#f4511e',
    },
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    erreur: {
        color: "red",
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    switchLabel: {
        flex: 1,
    },
});