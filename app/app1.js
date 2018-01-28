/**
 * Created by faiyaz on 1/27/2018.
 */
class Greeting extends React.Component {
    render() {
        return (<p>Hello world</p>);
    }
}
ReactDOM.render(
    <Greeting />,
    document.getElementById('root')
);