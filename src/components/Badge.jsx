export default function Badge(props) {

    return (
        <p><span style={{
            backgroundColor: props.color,
            color: 'white',
            padding: '4px 8px',
            textAlign: 'center',
            bordeRadius: '5px',
            fontSize: '14px',
        }}>

            {props.name}
        </span></p>
    )
}