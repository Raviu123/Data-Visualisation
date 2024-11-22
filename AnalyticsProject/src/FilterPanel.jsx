import React, { useState, useEffect } from 'react'

const FilterPanel = ({ handleFilterSubmit }) => {

    const [formdata, setFormdata] = useState({
        endyear:'',
        topics:[],
        sector:'',
        region:'',
        pestle:'',
        source:'',
        SWOT:'',
        country:'',
    });

    const [sector, setSector] = useState([]);
    const [regions, setRegions] = useState([]); // State to hold regions
    const [pestle, setPestle] = useState([]);
    const [source, setSource] = useState([]);
    const [country, setCountry] = useState([]);

    useEffect(() => {
        // Fetch form selection data from the API's
        const fetchdata = async () => {
            try {
                //fetch sector data
                const sectorResponce = await fetch('http://localhost:5000/api/sector');
                if (!sectorResponce.ok) {
                    throw new Error('Network response was not ok');
                }
                const data1  = await sectorResponce.json();
                setSector(data1); //set the fetched sectors to state
                
                //fetch region data
                const regionResponse = await fetch('http://localhost:5000/api/regions');
                if (!regionResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const data2 = await regionResponse.json();
                console.log('region data:', data2); 
                setRegions(data2); // Set the fetched regions to state

                // fetch pest data
                const pestleResponse = await fetch('http://localhost:5000/api/pest');
                if (!pestleResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const data3 = await pestleResponse.json();
                console.log('Pestle data:', data3); // <-- Add this line to check the data
                setPestle(data3);

                // fetch source data
                const sourceResponse = await fetch('http://localhost:5000/api/source');
                if (!sourceResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const data4 = await sourceResponse.json();
                console.log('source data:', data4); // <-- Add this line to check the data
                setSource(data4);

                // fetch country data
                const sourcecountry = await fetch('http://localhost:5000/api/country');
                if (!sourcecountry.ok) {
                    throw new Error('Network response was not ok');
                }
                const data5 = await sourcecountry.json();
                console.log('source data:', data5); // <-- Add this line to check the data
                setCountry(data5);

            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };

        fetchdata();
    }, []); // Empty dependency array means this runs once on component mount
    
    const handleform = (e)=>{
        const {name, value} = e.target;
        setFormdata(prevData =>({
            ...prevData,
            [name]:value
        }))
    };

    const handleSubmit = (e)=>{
        e.preventDefault(); // Prevents page reload on form submission
        handleFilterSubmit(formdata);
    }

  return (
    <>
    <div className="filter-container">
            <h1 className="filter-title">Filters</h1>
            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">End Year</label>
                    <input 
                        className="form-input"
                        name="endyear" 
                        type="number" 
                        value={formdata.endyear} 
                        onChange={handleform} 
                        placeholder="Enter End year" 
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Topics</label>
                    <textarea 
                        className="form-textarea"
                        name="topics" 
                        value={formdata.topics}
                        onChange={handleform}
                        placeholder="Enter topics"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Sector</label>
                    <select 
                        className="form-select"
                        name="sector" 
                        value={formdata.sector}
                        onChange={handleform}
                    >
                        <option value="">Select Sector</option>
                        {sector.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Region</label>
                    <select
                        className="form-select"
                        name="region"
                        value={formdata.region}
                        onChange={handleform}
                    >
                        <option value="">Select Region</option>
                        {regions.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">PESTLE</label>
                    <select
                        className="form-select"
                        name="pestle"
                        value={formdata.pestle}
                        onChange={handleform}
                    >
                        <option value="">Select PESTLE</option>
                        {pestle.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Source</label>
                    <select
                        className="form-select"
                        name="source"
                        value={formdata.source}
                        onChange={handleform}
                    >
                        <option value="">Select Source</option>
                        {source.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">SWOT</label>
                    <select 
                        className="form-select"
                        name="SWOT" 
                        value={formdata.SWOT} 
                        onChange={handleform}
                    >
                        <option value="">Select SWOT</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Country</label>
                    <select
                        className="form-select"
                        name="country"
                        value={formdata.country}
                        onChange={handleform}
                    >
                        <option value="">Select Country</option>
                        {country.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Apply Filters
                </button>
            </form>
        </div>
    </>
  )
}

export default FilterPanel