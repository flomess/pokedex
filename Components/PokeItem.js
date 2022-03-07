import { StyleSheet } from 'react-native';

export default function PokeItem(props) {

    const {color, text, showColor, ...restProps} = props

    return (
        <PokeItem
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
