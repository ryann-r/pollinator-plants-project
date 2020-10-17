
function App() {
    return (
        <React.Fragment>
        <div>Buzz buzz buzz.</div>

        <nav>
            <ReactRouterDOM.BrowserRouter>
                <p>
                    <ReactRouterDOM.Link to='/about'>About</ReactRouterDOM.Link>
                </p>
                <p>
                    <ReactRouterDOM.Link to='/region'>Find Plants by Region</ReactRouterDOM.Link>
                </p>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/about'>
                        <About />
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/region'>
                                {/* need to add route for each region -- use /region/<region> ? get region from map? */}
                        <Region />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>
        </nav>
        </React.Fragment>
        )
}

// dynamic routes -- look at docs, make request for plant_id from db using useeffect
// wrap everything in React.Fragment; otherwise can't have <div> and <nav> right next to each other

ReactDOM.render(<App />, document.getElementById('root'));

function About() {
    return (
        <div>Something about a web app.</div>
    )
};

function Region() {
    return (
        <div>List of regions, each a link to another page.
            Add ReactRouterDOM to app component.
            Eventually replace with clickable map.
        </div>
    )
};


// use regional plants; display plants on regional plants page
// make individual components clickable to see more info (/plants/<plant_id>)
function Plant(props) {
    const {common_name, scientific_name, region, plant_id} = props; //destructuring
    return (
        <React.Fragment>
            <h1>Common Name: {common_name}</h1>
            <p>Key: {plant_id}</p>
            <p>Scientific Name: {scientific_name}</p>
            <p>Region: {region}</p>
            {/* include image -- from table */}
        </React.Fragment>
    )
}

// test Plant component with hard-coded data
// ReactDOM.render(
//     <Plant common_name='Baby blue eyes' scientific_name='Nemophilia menziesii' region='California'/>,
//     document.getElementById('root')
// );



// possible pass in a plant as a prop instead of listing all props (common_name, etc) ? look up syntax
// optional: change empty list in useState([]) to a loading variable / loading part of state.
function PlantContainer(props) {

    const [plantData, setPlantData] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/plants')
        .then((response) => response.json())
        .then((data) => setPlantData(data))
    }, [])

    const plants = [];

    if (plantData.length === 0) {
        return <div>Loading...</div>;
    }
    for (const plant in plantData) {
        plants.push(
            <div key={plant.plant_id}>
            <Plant
            plant_id={plant.plant_id}
            common_name={plant.common_name} 
            scientific_name={plant.scientific_name}
            region={plant.region}/>
            </div>
        );
    }

    return (
        <React.Fragment>
            {plants}
        </React.Fragment>
    )
}

// in return statement above can use Array.map and object destructuring, look at docs

ReactDOM.render(
    <PlantContainer />,
    document.getElementById('root'));