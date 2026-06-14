import React from 'react';

const ResultCard = ({ name, subName, tagline, description, ingredients, benefits, usage, link, imageUrl }) => {
  return (
    <div className="result-card">
      <div className="result-tag">추천 솔루션</div>
      
      {/* 공식 제품 이미지 영역 */}
      {imageUrl && (
        <div className="result-image-container">
          <img src={imageUrl} alt={name} className="result-image" />
        </div>
      )}

      <h3 className="result-title">{name}</h3>
      <p className="result-subtitle">{subName} | {tagline}</p>
      
      <p className="result-desc">{description}</p>
      
      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.6rem', color: '#001E61', fontWeight: '800' }}>핵심 기능 및 혜택</h4>
      <ul className="benefit-list">
        {benefits.map((benefit, index) => (
          <li key={index} className="benefit-item">{benefit}</li>
        ))}
      </ul>
      
      <div className="result-meta">
        <div className="meta-row">
          <span className="meta-label">주요 유효 성분</span>
          <span className="meta-value">{ingredients.join(', ')}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">권장 섭취법</span>
          <span className="meta-value">{usage}</span>
        </div>
      </div>
      
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="result-cta"
      >
        공식 홈페이지에서 자세히 보기
      </a>
    </div>
  );
};

export default ResultCard;
