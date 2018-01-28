/**
 * Created by Mohamed Eliyas on 27-01-2018.
 */

let styles = {
    imageStyle: {
        width: '150px',
        height: '150px',
        marginTop: '10px'
    }
}

class Images extends React.Component {
    render() {
        return (
            <img src={this.props.src} className="side-nav-image" alt="images" style={styles.imageStyle}/>
        );
    }
}

