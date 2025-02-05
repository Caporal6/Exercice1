import { useState } from "react";
import { Button, Text, View, Alert, StyleSheet, Modal,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";



const AjouterContact =({}) =>{
    const [choix,setChoix] = useState("")
    const [visible, setVisible] = useState(true)
     const [prenom,setPrenom] = useState("")
    const [nom,setNom] = useState("") 
    const [numCell,setNumCell] = useState("")
    const [numProf,setNumProf] = useState("")
    const [email,setEmail] = useState("")
    const [photo,setPhoto] = useState("")

    const navigation = useNavigation();



    return(
        <View style={styles.back}>
            <View style={styles.centre}>
                <View style={styles.modal}>
                    <Text style={styles.titre}>Connexion</Text>
                    
                    <TextInput style={styles.input} placeholder="Prenom" value={prenom} onChangeText={setPrenom} />
                    <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
                    <TextInput style={styles.input} placeholder="Numéro de téléphone" value={numCell} onChangeText={setNumCell} />
                    <TextInput style={styles.input} placeholder="Numéro de téléphone Profésionnel" value={numProf} onChangeText={setNumProf} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} secureTextEntry placeholder="photo" value={photo} onChangeText={setPhoto}/> 

                    <Button title="Page contacts"  onPress={()=>navigation.popTo('Accueil', {nom: nom, prenom: prenom, numCell: numCell, numProf: numProf, email: email, photo: photo})}/>
                </View>
            </View>
        </View>
    )
}

export default AjouterContact;

const styles=StyleSheet.create({
    image:{
        height:150,
        width:150,
        borderRadius:100,
        
    },
    back:{
        backgroundColor:"white",
        margin:50,
        borderRadius:15,
        padding:15,
        width:300
    },
    centre: {
        flex: 1,

        },
        modal: {
        backgroundColor: "darkcyan"
        ,
        borderRadius: 5,
        padding: 25,
        alignItems: "start",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        },
        titre:{
        marginBottom: 15, textAlign:"center",
        color:"white",
        fontSize: 20,
        },
        input:{
        marginBottom: 15,
        borderWidth:1,
        borderColor:"white",
        backgroundColor:"white"
        },
})

