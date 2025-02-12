import { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AjouterContact = ({ route }) => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [numCell, setNumCell] = useState("");
    const [numProf, setNumProf] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [defaultNum, setDefaultNum] = useState("numCell");
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
            const newId = route.params?.personnes?.length ? route.params.personnes.length + 1 : 1;
            navigation.popToTop();
            navigation.navigate('Accueil', { id: newId, nom, prenom, numCell, numProf, email, photo, defaultNum });
        } else {
            console.log("Le formulaire n'est pas valide");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un contact</Text>
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
            <TextInput style={styles.input} placeholder="Photo URL" value={photo} onChangeText={setPhoto} />

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Numéro par défaut: {defaultNum === "numCell" ? "Cellulaire" : "Professionnel"}</Text>
                <Switch
                    value={defaultNum === "numCell"}
                    onValueChange={(value) => setDefaultNum(value ? "numCell" : "numProf")}
                />
            </View>

            <Button title="Ajouter" onPress={soumettre} color="#f4511e" />
        </View>
    );
};

export default AjouterContact;

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
