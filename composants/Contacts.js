import { Text, StyleSheet, View, FlatList, Button, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";

const Contacts = ({ route }) => {
    const navigation = useNavigation();

    const [personnes, setPersonnes] = useState([
        { id: 1, nom: "Jean", prenom: "Marie", numCell: "819-907-0722", numProf: "819-907-0721", email: "test@test.ca", photo: "https://flagcdn.com/w320/de.png", defaultNum: "numCell" },
        { id: 2, nom: "David", prenom: "Marc", numCell: "819-907-0722", numProf: "819-907-0721", email: "david@test.ca", photo: "https://flagcdn.com/w320/de.png", defaultNum: "numProf" },
        { id: 3, nom: "Maya", prenom: "Ricard", numCell: "819-907-0722", numProf: "819-907-0721", email: "maya@test.ca", photo: "https://flagcdn.com/w320/de.png", defaultNum: "numCell" },
    ]);

    useEffect(() => {
        if (route.params) {
            if (route.params.updatedContact) {
                const updatedContact = route.params.updatedContact;
                setPersonnes((prevPersonnes) =>
                    prevPersonnes.map((personne) =>
                        personne.id === updatedContact.id ? updatedContact : personne
                    )
                );
            } else {
                let tempListe = [...personnes,
                {
                    id: personnes.length + 1,
                    nom: route.params.nom,
                    prenom: route.params.prenom,
                    numCell: route.params.numCell,
                    numProf: route.params.numProf,
                    email: route.params.email,
                    photo: route.params.photo,
                    defaultNum: route.params.defaultNum,
                }];
                setPersonnes(tempListe);
            }
        }
    }, [route.params]);


    const supprimer = (index) => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer ce contact?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        let nouveau = personnes.filter((personne, i) => i !== index);
                        setPersonnes(nouveau);
                    },
                    style: "destructive"
                }
            ]
        );
    }



    const renderItem = ({ item, index }) => {
        const imageSource = item.photo ? { uri: item.photo } : require('../assets/profil.png');

        return (
            <View style={styles.carte}>
                <TouchableOpacity 
                    style={styles.ligne}
                    onLongPress={() => supprimer(index)}
                    onPress={() => navigation.navigate('Modifier', item)}
                >
                    <Image source={imageSource} style={styles.image} />
                    <View style={styles.texteContainer}>
                        <Text style={styles.texte}>{item.prenom} {item.nom}</Text>
                        <Text style={styles.texte}>Cell: {item.numCell}{item.defaultNum === "numCell" ? <Image source={require('../assets/cell.png')} style={styles.icon}/> : null} </Text>
                        <Text style={styles.texte}>Prof: {item.numProf}{item.defaultNum === "numProf" ? <Image source={require('../assets/cell.png')} style={styles.icon}/> : null}</Text>
                        <Text style={styles.texte}>Email: {item.email}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={personnes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Ajouter un contact" onPress={() => navigation.navigate('Ajouter')} color="#f4511e" />
        </View>
    );
};

export default Contacts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    carte: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#CC5500",
        borderRadius: 10,
    },
    ligne: {
        flexDirection: "row",
        alignItems: "center",
    },
    texteContainer: {
        flex: 1,
    },
    texte: {
        fontSize: 16,
        color: "white",
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    icon: {
        height: 20,
        width: 20,
        borderRadius: 25,
        marginRight: 10,
    },
    defaultIcon: {
        height: 20,
        width: 20,
        marginLeft: 10,
    },
});
