import { useState } from "react";
import { Button, Text, View, Alert, StyleSheet, Modal, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AjouterContact = () => {
    const [choix, setChoix] = useState("");
    const [visible, setVisible] = useState(true);
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [numCell, setNumCell] = useState("");
    const [numProf, setNumProf] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [defaultNum, setDefaultNum] = useState("numCell"); // State to track the default number

    const [erreurs, setErreurs] = useState([]);
    const [message, setMessage] = useState("");

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
            navigation.navigate('Accueil', { nom, prenom, numCell, numProf, email, photo, defaultNum });
        } else {
            console.log("Le formulaire n'est pas valide");
        }
    };

    return (
        <View style={styles.back}>
            <View style={styles.centre}>
                <View style={styles.modal}>
                    <Text style={styles.titre}>Connexion</Text>

                    <TextInput style={styles.input} placeholder="Prenom" value={prenom} onChangeText={setPrenom} />
                    {erreurs.erreurPrenom && <Text style={styles.erreur}>{erreurs.erreurPrenom}</Text>}
                    <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
                    {erreurs.erreurNom && <Text style={styles.erreur}>{erreurs.erreurNom}</Text>}
                    <TextInput style={styles.input} placeholder="Numéro de téléphone" value={numCell} onChangeText={setNumCell} />
                    {erreurs.erreurNumCell && <Text style={styles.erreur}>{erreurs.erreurNumCell}</Text>}
                    <TextInput style={styles.input} placeholder="Numéro de téléphone Profésionnel" value={numProf} onChangeText={setNumProf} />
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

                    <Button title="Page contacts" onPress={soumettre} />
                </View>
            </View>
        </View>
    );
};

export default AjouterContact;

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    back: {
        backgroundColor: "white",
        margin: 50,
        borderRadius: 15,
        padding: 15,
        width: 300,
    },
    centre: {
        flex: 1,
    },
    modal: {
        backgroundColor: "darkcyan",
        borderRadius: 5,
        padding: 25,
        alignItems: "start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titre: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "white",
    },
    erreur: {
        color: "red",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    switchLabel: {
        flex: 1,
        color: "white",
    },
});
