import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [], // ✅ Ensure articles is initialized as an empty array
      loading: true, // ✅ Show loading when fetching data
      page: 1,
      totalResults: 0,
    };
  }

  async fetchNews(page = 1) {
    this.setState({ loading: true }); // ✅ Set loading before fetching
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb85f46919344254a99e333ddf9d5a6d&page=${page}&pagesize=20`;
      let response = await fetch(url);
      let parsedData = await response.json();

      // ✅ Check if articles exist in response
      if (parsedData.articles) {
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          page,
          loading: false,
        });
      } else {
        console.error('Error fetching articles:', parsedData);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    this.fetchNews();
  }

  handlePreviousClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.fetchNews(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsChimp - Top Headlines</h2>

        {/* ✅ Show a loading message when fetching data */}
        {this.state.loading && <h4 className="text-center my-3">Loading news...</h4>}

        {/* ✅ Render only if articles exist */}
        {!this.state.loading && this.state.articles.length > 0 && (
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : 'No Title'}
                  description={element.description ? element.description.slice(0, 88) : 'No Description Available'}
                  imageUrl={element.urlToImage || 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png'}
                  newsUrl={element.url}
                />
              </div>
            ))}
          </div>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
