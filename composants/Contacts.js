import { Text, StyleSheet, View, FlatList, Button, Alert, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";

const Contacts = ({route}) =>{

    const navigation = useNavigation();



    const handleAjout = () => {
        let tempListe = [...personnes, { id: personnes.length + 1, nom: "Yessir" + personnes.length + 1 } ];
        setPersonnes(tempListe);
        };

    const [personnes, setPersonnes] = useState([
        {id: 1, nom: "Jean", prenom: "Marie", numCell:"819-907-0722", numProf:"819-907-0721", email:"test@test.ca", photo:"https://flagcdn.com/w320/de.png"},
        {id: 2, nom: "David", prenom: "Marc", numCell:"819-907-0722", numProf:"819-907-0721", email:"david@test.ca", photo:"https://flagcdn.com/w320/de.png"},
        {id: 3, nom: "Maya", prenom: "Ricard", numCell:"819-907-0722", numProf:"819-907-0721", email:"maya@test.ca", photo:"https://flagcdn.com/w320/de.png"},

        ]);

        useEffect(() => {
            if(route.params){
                let tempListe = [...personnes, 
                    {
                        id: personnes.length + 1,
                        nom: route.params.nom,
                        prenom: route.params.prenom,
                        numCell: route.params.numCell,
                        numProf: route.params.numProf,
                        email: route.params.email,
                        photo: route.params.photo,

                    }];
                    setPersonnes(tempListe);
            }
        },[route.params])

        const renderItem = ({ item }) => {
            return (
                <View style={styles.carte}>
                    <Pressable style={styles.ligne}>
                        <Image source={{ uri: item.photo }} style={styles.image} />
                        <View style={styles.texteContainer}>
                            <Text style={styles.texte}>{item.prenom} {item.nom}</Text>
                            <Text style={styles.texte}>Cell: {item.numCell}</Text>
                            <Text style={styles.texte}>Prof: {item.numProf}</Text>
                            <Text style={styles.texte}>Email: {item.email}</Text>
                        </View>
                    </Pressable>
                </View>
            );
        };

        const handleSelection = (item) => {
            let tempListe = personnes.map((personne) => {
            if (personne.id === item.id) {
            return { ...personne, nom: "Nouveau nom" };
            } else {
            return personne;
            }
            });
            setPersonnes(tempListe);
            };

        
        return (
        <View >
            <FlatList
            data={personnes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
            <Button title="Page Ajouter contact"  onPress={()=>navigation.navigate('Ajouter')}/>

            
            <Text>{route.params?.nom}</Text>


        </View>
        );
}
export default Contacts;

const styles =StyleSheet.create ({
    carte: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#dd5d82",
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
});
