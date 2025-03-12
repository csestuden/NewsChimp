import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", height: "100%" }}>
          <img
            src={imageUrl || "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png"}
            className="card-img-top"
            alt="news"
            style={{ height: "180px", objectFit: "cover" }} // Ensures uniform image size
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title" style={{ minHeight: "50px" }}>
              {title ? title.slice(0, 50) : "No Title"}
            </h5>
            <p className="card-text" style={{ minHeight: "60px" }}>
              {description ? description.slice(0, 88) : "No Description Available"}
            </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mt-auto">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
