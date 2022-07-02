import AsyncStorage from "@react-native-async-storage/async-storage";

export async function writeData(key: string, value: any) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getData(key: string) {
    return await AsyncStorage.getItem(key);
}