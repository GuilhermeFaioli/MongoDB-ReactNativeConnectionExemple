import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'

const CreateEmployee = ({ navigation }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [position, setPosition] = useState("")
    const [modal, setModal] = useState(false)

    const submitData = () => {
        fetch("http://10.0.2.2:3000/send-data", {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        }).then(res => res.json()).then(data => {
            Alert.alert(`${data.name} is saved successful!`)
            navigation.navigate("Home")
        })
    }

    const pickFromGallery = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
        if(granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled) {
                let newFile ={ uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test.${data.uri.split(".")[1]}` }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("You need to permit us to access the camera")
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if(granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled) {
                let newFile ={ uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test.${data.uri.split(".")[1]}` }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("You need to permit us to access the camera")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", "guilhermefa")

        fetch("https://api.cloudinary.com/v1_1/guilhermefa/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            setPicture(data.url)
            setModal(false)
        })
    }

    return (
        <View style={styles.root}>
                <TextInput
                    label="Name"
                    value={name}
                    style={styles.inputStyle}
                    theme={theme}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Email"
                    value={email}
                    style={styles.inputStyle}
                    theme={theme}
                    keyboardType="email-address"
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Phone"
                    value={phone}
                    style={styles.inputStyle}
                    theme={theme}
                    keyboardType="number-pad"
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label="Salary"
                    value={salary}
                    style={styles.inputStyle}
                    theme={theme}
                    keyboardType="decimal-pad"
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label="Position"
                    value={position}
                    style={styles.inputStyle}
                    theme={theme}
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                />
                <Button icon={picture==""?"upload":"check"} mode="contained" style={styles.inputStyle} theme={theme} onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                <Button icon="content-save" mode="contained" style={styles.inputStyle} theme={theme} onPress={() => submitData()}>
                    Save
                </Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {setModal(false)}}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" mode="contained" theme={theme} onPress={() => pickFromCamera()}>
                                Camera
                            </Button>

                            <Button icon="image-area" mode="contained" theme={theme} onPress={() => pickFromGallery()}>
                                Gallery
                            </Button>
                        </View>

                        <Button theme={theme} onPress={() => setModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
        </View>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default CreateEmployee

