import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: []
    };

    this.getVacancy = this.getVacancy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getVacancy({ lang, loca }) {
    // console.log(lang, loca);
    const link = 'https://github-jobs-proxy.appspot.com/positions?description=';
    fetch(`${link}${lang}&location=${loca}`)
        .then(data => data.json())
        .then(d => this.setState({ vacancy: d }));
  }


  handleSubmit(event) {
    event.preventDefault();
    const searchData = {
      lang: event.target.elements.lang.value,
      loca: event.target.elements.loca.value,
    };
    this.getVacancy(searchData);
  }

  render() {
    return (
        <div className='main-container'>
          <form onSubmit={this.handleSubmit}>
            <input type="text"
                   className='lang'
                   placeholder="Language"
                   name='lang'
            />
            <input type="text"
                   className='loca'
                   placeholder="Location"
                   name='loca'
            />
            <button className='btnSearch'>Search</button>
          </form>
          <span className='head'>Showing {this.state.vacancy.length > 0 ? this.state.vacancy.length : 0} jobs</span>
          <RenderVacancy vacancy={this.state.vacancy} />
        </div>
    );
  }

}

function RenderVacancy({ vacancy }) {
  console.log(vacancy);
  return (vacancy.length) ? vacancy.map(el =>
      <div className='container' key={el.id}>
        <div className='top-container'>
          <div className="name"><a href={el.url}>{el.title}</a></div>
          <div className="city">{el.location}</div>
        </div>
        <div className="bottom-container">
          <div><span className="company"><a href={el.company_url}>{el.company}</a></span> - <span className='type-work'>{el.type}</span></div>
          <div className="date">{parseInt((Date.now() - Date.parse(el.created_at)) / 86400000)} days ago</div>
        </div>
      </div>
  ) : <div>No data</div>;
}

export default App;
