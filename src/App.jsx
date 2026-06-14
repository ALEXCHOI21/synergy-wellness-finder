import React, { useState, useEffect } from 'react';
import { CONCERNS, PRODUCTS, PACKS } from './data/productsData';
import Card from './components/Card';
import ResultCard from './components/ResultCard';
import ProgressBar from './components/ProgressBar';
import leeYongDaeImg from './assets/lee_yong_dae_poster.jpg';
import megapackIntegratedImg from './assets/megapack_integrated.png';

// 자연어 분석용 키워드 매핑 사전
const NLP_DICTIONARY = {
  fatigue: ['피곤', '피로', '지친', '에너지', '힘들', '아침', '활력', '쉬고', '졸리', '무기력', '체력', '만성', '번아웃'],
  liver: ['간', '술', '회식', '숙취', '독소', '해독', '알코올', '음주', '황달', '침침'],
  diet: ['다이어트', '살', '체지방', '몸무게', '비만', '단백질', '근육', '체중', '운동', '식단', '굶', '칼로리'],
  skin: ['피부', '주름', '노화', '탄력', '건조', '앰플', '화장품', '미백', '기미', '콜라겐', '피부톤', '스킨케어'],
  gut: ['장', '소화', '더부룩', '가스', '변비', '배변', '유산균', '소화불량', '설사', '위', '속이', '배가']
};

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedPack, setRecommendedPack] = useState(null); // 최우선 처방 패키지
  const [autoDetectedCount, setAutoDetectedCount] = useState(0);

  // --- 유비오맥파 시뮬레이터 상태 ---
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simStress, setSimStress] = useState(50);
  const [simFatigue, setSimFatigue] = useState(55);
  const [simVascular, setSimVascular] = useState(3);
  const [macpaData, setMacpaData] = useState(null);

  // 사용자가 직접 입력한 텍스트 기반 자연어 매핑 로직
  useEffect(() => {
    if (!inputText.trim()) {
      setAutoDetectedCount(0);
      return;
    }

    const detected = [];
    const text = inputText.toLowerCase();

    Object.entries(NLP_DICTIONARY).forEach(([concernId, keywords]) => {
      const hasKeyword = keywords.some(keyword => text.includes(keyword));
      if (hasKeyword) {
        detected.push(concernId);
      }
    });

    setSelectedConcerns(prev => {
      const merged = Array.from(new Set([...detected]));
      return merged;
    });

    setAutoDetectedCount(detected.length);
  }, [inputText]);

  // 고민 선택/해제 핸들러
  const handleConcernClick = (id) => {
    setSelectedConcerns((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  // 맞춤 솔루션 계산 및 결과창 이동
  const handleAnalyze = (macpaOverride = null) => {
    setIsAnalyzing(true);
    
    // AI 진단 분석 로딩 시뮬레이션 (1.5초)
    setTimeout(() => {
      const concernsToUse = macpaOverride ? macpaOverride.concerns : selectedConcerns;
      const dataToUse = macpaOverride ? macpaOverride.data : null;
      
      // 1. 단품 추천 필터링
      const matched = PRODUCTS.filter(product => 
        product.matchingConcerns.some(concern => concernsToUse.includes(concern))
      );
      setRecommendedProducts(matched);

      // 2. 패키지(원팩 / 메가팩) 분기 판단 알고리즘
      let selectedPack = null;
      const isSevereVascular = dataToUse && dataToUse.vascular >= 4;
      const isSevereStress = dataToUse && (dataToUse.stress >= 60 || dataToUse.fatigue >= 60);
      const hasManyConcerns = concernsToUse.length >= 2;

      if (hasManyConcerns || isSevereVascular || isSevereStress) {
        selectedPack = PACKS.find(p => p.id === 'megapack');
      } else {
        selectedPack = PACKS.find(p => p.id === 'onepack');
      }
      setRecommendedPack(selectedPack);

      setIsAnalyzing(false);
      setShowResults(true);
      if (dataToUse) {
        setMacpaData(dataToUse);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  // 시뮬레이터 전송 핸들러
  const handleSimulatorSubmit = () => {
    setIsSimulatorOpen(false);
    
    const autoConcerns = [];
    if (simStress >= 45 || simFatigue >= 45) {
      autoConcerns.push('fatigue');
    }
    if (simVascular >= 3) {
      autoConcerns.push('liver');
    }
    if (simStress >= 55) {
      autoConcerns.push('gut');
    }

    const resultObj = {
      concerns: autoConcerns.length > 0 ? autoConcerns : ['fatigue'],
      data: {
        stress: simStress,
        fatigue: simFatigue,
        vascular: simVascular
      }
    };

    setSelectedConcerns(resultObj.concerns);
    handleAnalyze(resultObj);
  };

  // 재진단 핸들러
  const handleReset = () => {
    setSelectedConcerns([]);
    setInputText('');
    setShowResults(false);
    setRecommendedProducts([]);
    setRecommendedPack(null);
    setMacpaData(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 공식 브랜드 헤더 */}
      <header className="brand-header">
        <div className="logo-container">
          <img 
            src="https://usprod.synergyworldwide.com/globalassets/apac/apac-header/logo_new.svg" 
            alt="Synergy WorldWide" 
            className="brand-logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML += '<span style="font-size:1.3rem;font-weight:800;color:#001E61;font-family:Outfit">SYNERGY</span>';
            }}
          />
          <span className="brand-badge">WELLNESS FINDER</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {/* 가상 연동 모드 버튼 */}
          {!showResults && (
            <button 
              className="simulator-trigger-btn"
              onClick={() => setIsSimulatorOpen(true)}
            >
              🔌 유비오맥파 연동 데모
            </button>
          )}
          <button 
            onClick={handleReset}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#001E61', 
              fontWeight: '700', 
              cursor: 'pointer',
              fontSize: '1rem' 
            }}
          >
            처음으로
          </button>
        </div>
        
        {/* 상단 진행률 프로그레스바 */}
        <ProgressBar currentStep={showResults ? 2 : (selectedConcerns.length > 0 ? 1 : 0)} totalSteps={2} />
      </header>

      {/* 분석 중 로딩 스피너 */}
      {isAnalyzing && (
        <div className="loader-container" style={{ margin: 'auto' }}>
          <div className="spinner"></div>
          <h2 style={{ color: '#001E61', fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.8rem' }}>
            {macpaData ? '유비오맥파 검사 결과 수신 및 분석 중...' : '체질 및 건강 데이터 분석 중...'}
          </h2>
          <p style={{ color: '#555', marginTop: '0.8rem', fontSize: '1.15rem' }}>
            {macpaData ? '자율신경 및 혈관 탄성 데이터 기반 성분 조합 구성 중입니다.' : '선택하신 증상에 최적화된 성분 조합을 구성하고 있습니다.'}
          </p>
        </div>
      )}

      {/* 1단계: 고민 선택 화면 */}
      {!isAnalyzing && !showResults && (
        <>
          <section className="hero-section">
            <span className="hero-tag">My Personal Solution</span>
            <h1 className="hero-title">당신의 몸에 딱 맞는<br />1:1 맞춤형 영양 시너지를 찾아보세요</h1>
            <p className="hero-subtitle">
              불편하신 점을 주관식으로 직접 적거나 아래 건강 고민 카드 중에서 선택해 보세요.
              우측 상단의 **유비오맥파 연동 데모**를 클릭하면 혈관/스트레스 검사 데이터와의 연계를 모사할 수 있습니다.
            </p>
          </section>

          <main className="app-container">
            {/* 국가대표 이용대 홍보 배너 첫 화면 추가 */}
            <section className="model-banner-section">
              <div className="model-banner-card">
                <div className="model-image-container">
                                    <img 
                    src={leeYongDaeImg} 
                    alt="배드민턴 국가대표 이용대 모델" 
                    className="model-img" 
                  />
                </div>
                <div className="model-quote-details">
                  <div className="model-badge">SYNERGY CHAMPION VALUE</div>
                  <h2 className="model-quote-title">"프로알지는 제 최애 제품이에요.<br />중요한 시합 전에는 꼭 챙겨 먹습니다!"</h2>
                  <div className="model-info">
                    <span className="model-name">이용대 선수</span>
                    <span className="model-title">| 배드민턴 올림픽 금메달리스트</span>
                  </div>
                  <p className="model-desc">
                    국가대표 운동선수가 한계에 도전하고 최상의 피지컬을 관리하기 위해 선택한 영양 솔루션. 
                    600가지 이상의 원료 테스트를 거친 과학적인 에너지 시너지를 경험해 보세요.
                  </p>
                </div>
              </div>
            </section>

            {/* 직접 쓰기 인풋 필드 섹션 */}
            <div className="text-diagnosis-section" style={{ marginTop: '3rem' }}>
              <h2 className="section-title">✍️ 어디가 어떻게 안 좋으신가요?</h2>
              <p className="section-desc">
                예: "요즘 야근이 잦아 술도 자주 먹고 아침에 너무 피곤해요. 살도 찌는 것 같아 다이어트도 필요해요."
              </p>
              <textarea
                className="diagnosis-textarea"
                placeholder="불편하신 증상을 자유롭게 입력하시면 실시간으로 관련 건강 고민을 감지하여 분석합니다..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {autoDetectedCount > 0 && (
                <div className="nlp-badge">
                  💡 입력하신 텍스트에서 <strong>{autoDetectedCount}개</strong>의 맞춤 건강 고민 카드가 실시간 감지되어 자동 선택되었습니다.
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem' }}>
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>📋 건강 고민 카테고리 (중복 선택 가능)</h2>
              <div className="concerns-grid">
                {CONCERNS.map((concern) => (
                  <Card 
                    key={concern.id}
                    {...concern}
                    isSelected={selectedConcerns.includes(concern.id)}
                    onClick={handleConcernClick}
                  />
                ))}
              </div>
            </div>

            <div className="cta-container">
              <button 
                className="btn-primary" 
                onClick={() => handleAnalyze()}
                disabled={selectedConcerns.length === 0}
              >
                <span>맞춤 영양 솔루션 분석하기</span>
                <span>→</span>
              </button>
              {selectedConcerns.length === 0 && (
                <p style={{ color: '#A0AEC0', fontSize: '0.95rem', marginTop: '0.8rem' }}>
                  증상을 적거나 최소 1개 이상의 고민을 선택해 주세요.
                </p>
              )}
            </div>
          </main>
        </>
      )}

      {/* 2단계: 결과 화면 */}
      {!isAnalyzing && showResults && (
        <main className="app-container results-section">
          {/* 유비오맥파 하드웨어 연동 데이터 배너 */}
          {macpaData && (
            <div className="macpa-data-panel">
              <div className="macpa-panel-title">🔌 uBioMacpa 측정 데이터 연동 성공 (시나리오 C 시뮬레이션)</div>
              <div className="macpa-metrics-grid">
                <div className="macpa-metric-card">
                  <span className="metric-label">자율신경 스트레스 지수</span>
                  <span className="metric-value" style={{ color: macpaData.stress >= 60 ? '#E53E3E' : '#2B6CB0' }}>
                    {macpaData.stress}% {macpaData.stress >= 60 ? '(위험)' : (macpaData.stress >= 45 ? '(주의)' : '(안정)')}
                  </span>
                </div>
                <div className="macpa-metric-card">
                  <span className="metric-label">누적 피로도</span>
                  <span className="metric-value" style={{ color: macpaData.fatigue >= 60 ? '#E53E3E' : '#2B6CB0' }}>
                    {macpaData.fatigue}% {macpaData.fatigue >= 60 ? '(위험)' : (macpaData.fatigue >= 45 ? '(주의)' : '(안정)')}
                  </span>
                </div>
                <div className="macpa-metric-card">
                  <span className="metric-label">말초 혈관 탄성 단계</span>
                  <span className="metric-value" style={{ color: macpaData.vascular >= 4 ? '#E53E3E' : '#2B6CB0' }}>
                    {macpaData.vascular}단계 (총 7단계) {macpaData.vascular >= 4 ? '(위험)' : (macpaData.vascular >= 3 ? '(주의)' : '(양호)')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="results-header">
            <span className="hero-tag" style={{ color: '#1890FF' }}>YOUR WELLNESS COMBINATION</span>
            <h1 className="hero-title">당신만을 위한 맞춤 처방 솔루션</h1>
            <p className="hero-subtitle" style={{ maxWidth: '750px' }}>
              {macpaData 
                ? '유비오맥파 장치 측정 결과와 체질 상태를 복합 분석하여 설계된 종합 솔루션입니다.'
                : `선택/감지된 고민(${selectedConcerns.map(c => CONCERNS.find(item => item.id === c)?.title.split(' ')[0]).join(', ')})에 최적화된 처방 구성입니다.`
              }
            </p>
          </div>

          {/* 1. 주력 추천 패키지 솔루션 (원팩 / 메가팩) */}
          {recommendedPack && (
            <section className="special-package-section" style={{ marginBottom: '4rem' }}>
              <div className="package-card-premium">
                <div className="package-badge">🏆 최우선 추천 패키지 처방</div>
                <div className="package-content-wrapper">
                  <div className="package-image-container">
                    <img src={recommendedPack.id === 'megapack' ? megapackIntegratedImg : recommendedPack.imageUrl} alt={recommendedPack.name} className="package-image" />
                  </div>
                  <div className="package-text-details">
                    <h2 className="package-title">{recommendedPack.name}</h2>
                    <p className="package-subtitle">{recommendedPack.subName} | {recommendedPack.tagline}</p>
                    <p className="package-desc">{recommendedPack.description}</p>

                    {/* 과학적 12주 세포 리셋 설득 안내 패널 */}
                    {recommendedPack.id === 'megapack' && (
                      <div className="package-scientific-story">
                        <div className="story-title">🧬 왜 1년 치 영양 자산을 12주에 압축하여 섭취할까요?</div>
                        <div className="story-body">
                          인간 몸의 적혈구 및 대사 세포가 완전히 재생(Turnover)되어 새롭게 교체되는 주기는 평균 <strong>120일(약 12주)</strong>입니다. 
                          이 세포 리뉴얼 기간 동안 1년 치 고기능성 활성 성분을 체내에 집중적·폭발적으로 포화(Saturation)시킬 때, 
                          정체되어 있던 혈액 순환 대사 회로가 깨어나고 혈관 노폐물이 청소되며 만성 피로와 비만 체질이 근본적으로 리부팅되는 
                          <strong>'시너지 임계점'</strong> 효과를 달성하게 됩니다.
                        </div>
                      </div>
                    )}
                    
                    <div className="package-components">
                      <span className="component-label">📦 패키지 구성 제품:</span>
                      <div className="component-tags">
                        {recommendedPack.components.map((c, idx) => (
                          <span key={idx} className="comp-tag">{c}</span>
                        ))}
                      </div>
                    </div>

                    <ul className="package-benefits">
                      {recommendedPack.benefits.map((b, idx) => (
                        <li key={idx} className="benefit-item">{b}</li>
                      ))}
                    </ul>

                    <div className="package-bottom-row">
                      <span className="package-usage-text">💡 복용법: <strong>{recommendedPack.usage}</strong></span>
                      {recommendedPack.id !== 'megapack' && (
                        <a href={recommendedPack.link} target="_blank" rel="noopener noreferrer" className="package-cta-btn">
                          공식 스토어에서 패키지 보기
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 2. 단품 추천 솔루션 목록 */}
          <div>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.7rem' }}>💊 개별 집중 케어 권장 제품</h2>
            <div className="results-grid">
              {recommendedProducts.length > 0 ? (
                recommendedProducts.map((product) => (
                  <ResultCard key={product.id} {...product} />
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
                  <p style={{ color: '#718096' }}>추천 가능한 솔루션 제품이 존재하지 않습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* 상담 및 가입 연동 CTA 배너 */}
          <div className="action-banner">
            <h2 className="banner-title">전문 팀 멤버와 맞춤 헬스 컨설팅 시작하기</h2>
            <p className="banner-desc">
              체질 진단 결과에 따라 추가적인 복용 팁이나 구매/비즈니스 회원 혜택이 궁금하신가요? 
              전문적인 헬스 가이드를 제공하는 시너지 코리아의 공인 멤버와 직접 연결해 보세요.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://www.synergyworldwide.com/KR/ko-KR/member-lookup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                가까운 팀 멤버 찾기
              </a>
              <button 
                onClick={handleReset}
                className="btn-secondary" 
                style={{ background: 'transparent', border: '2px solid #FFFFFF', color: '#FFFFFF' }}
              >
                다시 진단하기
              </button>
            </div>
          </div>
        </main>
      )}

      {/* --- 유비오맥파 시뮬레이터 모달 --- */}
      {isSimulatorOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2 className="modal-title">🔌 uBioMacpa 가상 측정 장치 시뮬레이터</h2>
            <p className="modal-desc">
              하드웨어 측정기가 없을 때 연동 기능을 모사하기 위한 시뮬레이터입니다.
              지표를 설정하고 데이터를 전송해 보세요.
            </p>

            <div className="simulator-control-group">
              <div className="control-item">
                <div className="control-label-row">
                  <span>자율신경 스트레스 지수</span>
                  <span className="control-val-badge">{simStress}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simStress} 
                  onChange={(e) => setSimStress(Number(e.target.value))} 
                />
              </div>

              <div className="control-item">
                <div className="control-label-row">
                  <span>누적 피로도</span>
                  <span className="control-val-badge">{simFatigue}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simFatigue} 
                  onChange={(e) => setSimFatigue(Number(e.target.value))} 
                />
              </div>

              <div className="control-item">
                <div className="control-label-row">
                  <span>말초 혈관 탄성 단계 (1~7단계)</span>
                  <span className="control-val-badge">{simVascular}단계</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="7" 
                  value={simVascular} 
                  onChange={(e) => setSimVascular(Number(e.target.value))} 
                />
              </div>
            </div>

            <div className="modal-buttons-row">
              <button 
                className="btn-simulator-submit"
                onClick={handleSimulatorSubmit}
              >
                가상 데이터 전송 (API 연동 모사)
              </button>
              <button 
                className="btn-simulator-close"
                onClick={() => setIsSimulatorOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer style={{ 
        marginTop: 'auto', 
        padding: '2.5rem', 
        backgroundColor: '#001E61', 
        color: 'rgba(255,255,255,0.7)', 
        fontSize: '0.95rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p>© 2026 Synergy WorldWide Korea. All Rights Reserved. | KDSA 직접판매공제조합 가입 회원사</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>본 웹사이트는 맞춤형 제품 추천 서비스를 시뮬레이션하기 위한 데모 플랫폼입니다.</p>
      </footer>
    </div>
  );
}

export default App;
