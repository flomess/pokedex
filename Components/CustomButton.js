import { StyleSheet, Button } from 'react-native';

export default function CustomButton(props) {

    const {color, text, showColor, ...restProps} = props

    return (
            <Button
                onPress={() => showColor(color)}
                title={text}
                color={color}
            />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
