export const CONCERNS = [
  {
    id: "fatigue",
    title: "만성 피로 및 활력 저하",
    description: "아침에 일어나기 힘들고 일상에서 쉽게 지치는 분",
    icon: "⚡",
    symptoms: ["에너지 부족", "아침 피로", "집중력 저하"],
    targetIngredients: ["L-아르기닌", "비타민 B6", "비타민 C", "엽산"]
  },
  {
    id: "liver",
    title: "간 해독 및 숙취/독소 배출",
    description: "잦은 야근 and 회식으로 간 건강 관리가 필요하신 분",
    icon: "🌱",
    symptoms: ["만성 피로", "눈의 충혈/피로", "숙취 해소 부진"],
    targetIngredients: ["실리마린(밀크씨슬)", "엽산", "마그네슘"]
  },
  {
    id: "diet",
    title: "체중 조절 및 대사 활성화",
    description: "건강한 체중 관리와 체지방 감소를 원하시는 분",
    icon: "🔥",
    symptoms: ["체지방 증가", "기초대사량 저하", "식습관 불균형"],
    targetIngredients: ["단백질", "가르시니아", "식이섬유"]
  },
  {
    id: "skin",
    title: "피부 탄력 및 안티에이징",
    description: "칙칙해진 피부 톤과 탄력 저하로 고민하시는 분",
    icon: "✨",
    symptoms: ["피부 탄력 저하", "피부 건조", "칙칙한 피부톤"],
    targetIngredients: ["PDRN", "피쉬 콜라겐", "히알루론산"]
  },
  {
    id: "gut",
    title: "장 건강 및 소화 불편",
    description: "불규칙한 배변 활동과 더부룩한 속으로 불편하신 분",
    icon: "🧪",
    symptoms: ["가스/더부룩함", "불규칙한 배변", "장내 유익균 감소"],
    targetIngredients: ["프락토올리고당(FOS)", "유산균", "엽록소"]
  }
];

export const PRODUCTS = [
  {
    id: "proargi9",
    name: "프로알지-9 플러스 멀티비타민",
    subName: "ProArgi-9+",
    tagline: "하루 한 번, 활력과 건강 균형으로 통하는 습관",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-ad9da126ec0f9d57cb7f681befe51c.webp?v=110325015248",
    description: "L-아르기닌과 비타민 C, B6, 엽산을 과학적으로 배합하여 혈행 및 세포 보호, 체내 영양 균형에 탁월한 시너지 대표 베스트셀러 제품입니다.",
    ingredients: ["L-아르기닌", "비타민 C", "비타민 B6", "엽산"],
    benefits: [
      "항산화 작용으로 유해산소로부터 세포 보호",
      "혈액의 호모시스테인 수준을 정상으로 유지",
      "세포와 혈액 생성 및 에너지 대사 도움"
    ],
    matchingConcerns: ["fatigue", "liver"],
    usage: "1일 1회, 1포를 물 200~300ml에 잘 태워 섭취하십시오.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/proargi-9-np#KR97409"
  },
  {
    id: "maximum_protein",
    name: "시너지 맥시멈 프로틴",
    subName: "Maximum Protein",
    tagline: "든든하고 완벽한 양질의 단백질 충전",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-56a7109c91b54558a025e4977f2d6e33.webp?v=141025062622",
    description: "대사 활동과 근육 유지를 위해 필수적인 프리미엄 식물성/유청 단백질 복합체로, 활력 있는 신체와 체중 조절에 필수적인 에너지원입니다.",
    ingredients: ["단백질", "비타민 B군", "미네랄"],
    benefits: [
      "체지방 감소기 근육 유실 방지",
      "세포 재생 및 필수 아미노산 공급",
      "포만감 유지로 다이어트 식단 대체 가능"
    ],
    matchingConcerns: ["diet", "fatigue"],
    usage: "1일 1~2회, 1회 1포를 물 또는 두유/우유에 섞어 섭취하십시오.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/maximum-protein-2510#KR23151"
  },
  {
    id: "control_fos",
    name: "컨트롤 FOS",
    subName: "Control FOS",
    tagline: "장내 환경을 바꾸는 유익균의 먹이",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-c37fddbf01f34a8aa3071de2f678a20c.png?v=160824035904",
    description: "프락토올리고당(FOS)을 고함량 함유하여 장내 유익균을 증식시키고 배변활동 원활 및 장 건강을 근본적으로 케어하는 건강기능식품입니다.",
    ingredients: ["프락토올리고당(FOS)", "유산균 혼합 분말"],
    benefits: [
      "장내 유익균 증식 및 유해균 억제",
      "칼슘 흡수 및 배변 활동 원활에 도움",
      "체중 감량 시 발생하는 소화 및 배변 정체 해결"
    ],
    matchingConcerns: ["gut", "diet"],
    usage: "1일 1회, 1회 1포를 직접 또는 물과 함께 섭취하십시오.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/controlfos-np#KR97403"
  },
  {
    id: "lamara_pdrn",
    name: "라마라 딥코어 피디알엔 앰플",
    subName: "Lamara PDRN Ampoule",
    tagline: "피부 깊은 곳부터 채우는 자생 에너지",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-497170e678bf44c0a4fd402d7b177887.webp?v=110325013751",
    description: "바이오 트렌드 성분인 PDRN(연어 DNA 추출물)과 저분자 피쉬콜라겐이 함유되어 무너진 피부 장벽을 복구하고 탄력을 되찾아 주는 탄력 솔루션입니다.",
    ingredients: ["PDRN", "피쉬 콜라겐", "히알루론산"],
    benefits: [
      "피부 속 탄력 및 치밀도 개선 효과",
      "지친 피부 장벽 강화 및 수분 충전",
      "피부 자생력 강화로 주름 완화 도움"
    ],
    matchingConcerns: ["skin"],
    usage: "저녁 스킨케어 단계에서 적당량을 취해 피부에 골고루 펴 바릅니다.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/lamara-pdrn#KR24148"
  },
  {
    id: "b_prime",
    name: "비-프라임 마그네슘",
    subName: "B-Prime Magnesium",
    tagline: "에너지 이용과 신경 안정 기능의 마그네슘",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-3045e43a2467491a891d43293a5b9b02.png?v=170625054213",
    description: "피로 해소, 신경 기능 유지 및 근육 건강에 필수적인 고흡수율 마그네슘 제제로 스트레스 해소와 숙면에 필수적인 영양제입니다.",
    ingredients: ["마그네슘", "과일 채소 혼합 분말"],
    benefits: [
      "에너지 이용 및 신경/근육 기능 유지",
      "만성 피로 및 불면증 완화 도움",
      "체내 해독 대사 촉진"
    ],
    matchingConcerns: ["fatigue", "liver"],
    usage: "1일 1회, 1회 2캡슐을 물과 함께 섭취하십시오.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/b-primemagnesium-np#KR97387"
  },
  {
    id: "true_green",
    name: "트루그린 플러스 라임향",
    subName: "TrueGreen Plus",
    tagline: "식물 영양소 엽록소로 가벼워지는 하루",
    imageUrl: "https://usprod.synergyworldwide.com/globalassets/synergy-products-catalog/products/kr-bad40831e057471ca65a5519633a3ab9.webp?v=110325041928",
    description: "알팔파 추출물 등 자연 유래 엽록소를 정제하여 체내 불순물을 중화하고 노폐물 배출(간 해독)을 유도하는 음용 액상 제품입니다.",
    ingredients: ["엽록소(클로로필)", "알팔파 추출물", "라임 오일"],
    benefits: [
      "체내 활성산소 억제 및 산성화 예방",
      "노폐물 배출 유도를 통한 간 기능 보조",
      "라임향으로 상쾌하게 마시는 수분/디톡스 섭취"
    ],
    matchingConcerns: ["liver", "gut"],
    usage: "물 500ml에 적정량(1티스푼 가량)을 희석하여 수시로 마십니다.",
    link: "https://www.synergyworldwide.com/KR/ko-KR/Shop/Product/truegreenpluslime-np#KR97404"
  }
];
