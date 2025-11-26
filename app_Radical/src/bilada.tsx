import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native";

export function bilada(){
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
            <Text>bilada</Text>    
            <ActivityIndicator
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            />
        </View>
        
    )
}