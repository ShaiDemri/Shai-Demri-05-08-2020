import Loadable from 'react-loadable';

function Loading({error}) {
    if (error) {
        return null;
    }
    return null;
}

const LazyComponent = loader =>
    Loadable({
        loader,
        loading: Loading
    });

export default LazyComponent;
