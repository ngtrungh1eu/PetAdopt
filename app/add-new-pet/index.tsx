import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { db, storage } from '@/config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [formData, setFormData] = useState<any>({
    category: 'Dogs',
    sex: 'Male',
  });
  const [gender, setGender] = useState<any>();
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('Dogs');
  const [image, setImage] = useState<any>(null);
  const [loader, setLoader] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      //   headerTransparent: true,
      headerTitle: 'Add New Pet',
    });
    getCategory();
  }, []);

  const getCategory = async () => {
    const newList: any[] = [];
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      newList.push(doc.data());
    });
    setCategoryList(newList);
  };

  const handleInputChange = (fieldName: any, fieldValue: any) => {
    console.log(fieldName, fieldValue);
    setFormData((prev: any) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = () => {
    console.log(formData);
    if (Object.keys(formData).length != 8) {
      alert('Please fill all the fields');
      return;
    }
    uploadImage();
  };

  const imagePicker: any = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    // handleInputChange('image', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, '/PetAdopt/' + Date.now() + '.jpg');
    await uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
      })
      .then((response) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log(url);
          saveFormData(url);
        });
      });
  };

  const saveFormData = async (imageUrl: any) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, 'Pet', docId), {
      id: docId,
      ...formData,
      image: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
    });
    setLoader(false);
    router.replace('/(tabs)/home');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfitMedium', fontSize: 20 }}>Add new pet for adoption</Text>
      <Pressable onPress={imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePicker} />
        ) : (
          <Image
            source={require('../../assets/images/placeholder.png')}
            style={styles.imagePicker}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Pet name"
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange('category', itemValue);
          }}
        >
          {categoryList.map((item: any, index: number) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed:</Text>
        <TextInput
          style={styles.input}
          placeholder="Breed"
          onChangeText={(value) => handleInputChange('breed', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Weight"
          onChangeText={(value) => handleInputChange('weight', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Age"
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue), handleInputChange('sex', itemValue);
          }}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(value) => handleInputChange('address', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About:</Text>
        <TextInput
          style={styles.textArea}
          numberOfLines={5}
          multiline={true}
          placeholder="About"
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>

      <TouchableOpacity disabled={loader} style={styles.button} onPress={() => onSubmit()}>
        {loader ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: 'center',
              fontFamily: 'outfitMedium',
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginTop: 20,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    fontFamily: 'outfit',
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: {
    marginVertical: 10,
    fontFamily: 'outfit',
  },
  textArea: {
    height: 150,
    padding: 10,
    fontFamily: 'outfit',
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 100,
  },
});
