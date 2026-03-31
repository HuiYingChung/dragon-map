export type Locale = "en" | "zh";

export interface DragonRegion {
  id: string;
  name: string;
  nameZh: string;
  tradition: string;
  traditionZh: string;
  region: string;
  regionZh: string;
  associatedWith: string;
  associatedWithZh: string;
  description: string;
  descriptionZh: string;
  atmosphere: string;
  atmosphereZh: string;
  mapPosition: { x: number; y: number };
  color: string;
  glowColor: string;
  dragonStyle:
    | "flowing"
    | "serpent"
    | "winged"
    | "feathered"
    | "coiling"
    | "storm"
    | "cosmic";
  image: string;
}

export const dragonRegions: DragonRegion[] = [
  {
    id: "china",
    name: "Long",
    nameZh: "龍",
    tradition: "Chinese / East Asian",
    traditionZh: "中國 / 東亞",
    region: "China & East Asia",
    regionZh: "中國與東亞",
    associatedWith: "Rain, rivers, clouds, power, auspicious force",
    associatedWithZh: "雨、水脈、雲氣、權威、祥瑞之力",
    description:
      "A dragon of movement rather than heaviness — serpentine, celestial, and deeply tied to water and sky. Here, the dragon rises with rain, rivers, clouds, and imperial imagination.",
    descriptionZh:
      "這是一種重在流動而非沉重的龍形存在，身軀如蛇，氣息近天，與水域與蒼穹緊密相連。在這片文化想像中，龍隨雨勢、河川、雲氣與帝王象徵一同升起。",
    atmosphere:
      "In East Asia, the dragon rises with rain, rivers, clouds, and imperial imagination.",
    atmosphereZh: "在東亞，龍與雨勢、河川、雲氣以及帝國想像一同升起。",
    mapPosition: { x: 73.8, y: 24.2 },
    color: "#c9a84c",
    glowColor: "rgba(201, 168, 76, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/china-east-asia-long.png",
  },
  {
    id: "japan",
    name: "Ryū",
    nameZh: "龍",
    tradition: "Japanese",
    traditionZh: "日本",
    region: "Japan",
    regionZh: "日本列島",
    associatedWith: "Lakes, storms, mountain spirits, rainfall",
    associatedWithZh: "湖泊、風暴、山靈、降雨",
    description:
      "Quieter than its continental cousin, the Japanese dragon lives in mist-shrouded lakes and sacred peaks. It brings rain, guards waterways, and vanishes into mountain air.",
    descriptionZh:
      "相較於大陸上的龍，日本的龍顯得更為靜謐，棲息於霧氣籠罩的湖泊與神聖山巔。它帶來降雨，守護水道，也在山中的潮濕空氣裡隱沒身形。",
    atmosphere:
      "In these islands, dragons sleep in lakes, storms, and sacred mountain air.",
    atmosphereZh: "在這些島嶼之上，龍沉眠於湖水、風暴與神聖山氣之中。",
    mapPosition: { x: 83.2, y: 24.6 },
    color: "#7a9bb5",
    glowColor: "rgba(122, 155, 181, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/japan-ryu.png",
  },
  {
    id: "korea",
    name: "Yong / Imugi",
    nameZh: "龍 / 蟒靈",
    tradition: "Korean",
    traditionZh: "韓國",
    region: "Korea",
    regionZh: "朝鮮半島",
    associatedWith: "Transformation, ascension, protection, blessing",
    associatedWithZh: "蛻變、升天、護佑、祝福",
    description:
      "Some dragon forms here are not born complete — they ascend into legend. The Imugi, a lesser serpent, must endure centuries before earning its place among the heavens.",
    descriptionZh:
      "此地的某些龍形存在並非生而完整，而是在漫長歲月中逐步升入傳說。作為較低階蛇靈的 Imugi，必須歷經漫長修行，才有機會獲得升天之位。",
    atmosphere:
      "Some dragon forms here are not born complete — they ascend into legend.",
    atmosphereZh: "有些龍並非天生圓滿，而是在歲月裡一步步升入傳說。",
    mapPosition: { x: 79.0, y: 23.4 },
    color: "#9cb88b",
    glowColor: "rgba(156, 184, 139, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/korea-yong-iImugi.png",
  },
  {
    id: "india",
    name: "Nāga",
    nameZh: "那伽",
    tradition: "Hindu / Buddhist",
    traditionZh: "印度教 / 佛教",
    region: "India & South Asia",
    regionZh: "印度與南亞",
    associatedWith: "Rivers, thresholds, sacred memory, protection",
    associatedWithZh: "河流、門檻、神聖記憶、守護",
    description:
      "Not all dragons fly. Some coil beneath rivers, thresholds, and sacred memory. The Nāga guards water, wisdom, and the boundary between the human and divine worlds.",
    descriptionZh:
      "並非所有龍都在天際飛翔。有些存在盤踞於河流之下、門檻之旁與神聖記憶深處。那伽守護著水、智慧，以及人界與神界之間的邊界。",
    atmosphere:
      "Not all dragons fly. Some coil beneath rivers, thresholds, and sacred memory.",
    atmosphereZh: "並非所有龍都飛翔；有些盤踞於河流、門檻與神聖記憶之下。",
    mapPosition: { x: 62.2, y: 28.8 },
    color: "#b07aa1",
    glowColor: "rgba(176, 122, 161, 0.3)",
    dragonStyle: "coiling",
    image: "/dragons/india-south-asia-naga.png",
  },
  {
    id: "mesoamerica",
    name: "Quetzalcoatl",
    nameZh: "羽蛇神",
    tradition: "Mesoamerican",
    traditionZh: "中美洲",
    region: "Mesoamerica",
    regionZh: "中美洲",
    associatedWith: "Wind, knowledge, divinity, creation",
    associatedWithZh: "風、知識、神性、創造",
    description:
      "Here, the serpent wears feathers and carries wind, divinity, and thought. Quetzalcoatl is not merely a beast — it is a god of knowledge, creation, and the dawn.",
    descriptionZh:
      "在這裡，蛇披上羽毛，承載風、神性與思維。羽蛇神不只是異獸，更是知識、創造與曙光之神。",
    atmosphere:
      "Here, the serpent wears feathers and carries wind, divinity, and thought.",
    atmosphereZh: "在這裡，蛇披羽而行，帶著風、神性與思想而來。",
    mapPosition: { x: 27.8, y: 32.8 },
    color: "#4db89e",
    glowColor: "rgba(77, 184, 158, 0.3)",
    dragonStyle: "feathered",
    image: "/dragons/mesoamerica-quetzalcoatl-feathered-serpent.png",
  },
  {
    id: "south-america",
    name: "Boiuna",
    nameZh: "博尤納",
    tradition: "Amazonian / South American",
    traditionZh: "亞馬遜 / 南美",
    region: "Amazon Basin & South America",
    regionZh: "亞馬遜盆地與南美洲",
    associatedWith: "Rivers, darkness, transformation, floodwaters, fear",
    associatedWithZh: "河流、幽暗、變形、洪水、敬畏",
    description:
      "In Amazonian lore, the great black serpent moves through river depth, night water, and sudden transformation. Boiuna, or Cobra Grande, belongs to the flooded world of channels and currents where the river itself seems alive and watching.",
    descriptionZh:
      "在亞馬遜傳說裡，巨大的黑蛇穿行於深河、夜水與突如其來的變形之中。博尤納，也被稱為 Cobra Grande，屬於那個由水道與急流組成的洪泛世界，彷彿連河流本身都具有意志與目光。",
    atmosphere:
      "In the Amazon, the serpent is felt in black water, flood, and the unseen pull below the surface.",
    atmosphereZh: "在亞馬遜，蛇存在於黑水、洪汛與水面下看不見的牽引之中。",
    mapPosition: { x: 31.2, y: 36.8 },
    color: "#5f8c87",
    glowColor: "rgba(95, 140, 135, 0.3)",
    dragonStyle: "serpent",
    image: "/dragons/south-america-boiuna-cobra-grande.png",
  },
  {
    id: "north-america",
    name: "Horned Serpent",
    nameZh: "角蛇",
    tradition: "Indigenous North American",
    traditionZh: "北美原住民",
    region: "North America",
    regionZh: "北美洲",
    associatedWith: "Lakes, rivers, storms, medicine, sacred danger",
    associatedWithZh: "湖泊、河流、風暴、靈藥、神聖危險",
    description:
      "Across many Indigenous traditions of North America, the horned serpent belongs to powerful waters rather than distant skies. It appears in rivers, deep lakes, and storm-haunted places where awe, warning, and spiritual force meet.",
    descriptionZh:
      "在許多北美原住民族傳統中，角蛇不屬於遙遠的天空，而屬於強大的水域。它現身於河流、深湖與風暴盤旋之地，在那裡，敬畏、警示與靈性力量交會。",
    atmosphere:
      "In North America, serpent power rises from waters, weather, and sacred caution.",
    atmosphereZh: "在北美，蛇的力量自水域、天候與神聖的警示中升起。",
    mapPosition: { x: 31.5, y: 24.8 },
    color: "#6d9f92",
    glowColor: "rgba(109, 159, 146, 0.3)",
    dragonStyle: "serpent",
    image: "/dragons/indigenous-north-america-horned-serpent.png",
  },
  {
    id: "europe",
    name: "Dragon",
    nameZh: "巨龍",
    tradition: "European Medieval",
    traditionZh: "歐洲中世紀",
    region: "Western Europe",
    regionZh: "西歐",
    associatedWith: "Fire, treasure, conquest, fear, heroic struggle",
    associatedWithZh: "火焰、財寶、征服、恐懼、英雄試煉",
    description:
      "In much of Europe, the dragon is a beast to be fought, feared, and sung about. It guards gold in mountain caves and appears in tales of knightly valor and divine confrontation.",
    descriptionZh:
      "在歐洲的大部分地區，龍是必須被對抗、被畏懼、也被吟唱的猛獸。它守著山洞中的金銀財寶，也出現在騎士英勇與神聖對決的故事裡。",
    atmosphere:
      "In much of Europe, the dragon is a beast to be fought, feared, and sung about.",
    atmosphereZh: "在歐洲大地，龍往往是被征戰、被畏懼，也被歌唱的巨獸。",
    mapPosition: { x: 49.7, y: 23.9 },
    color: "#c45c3e",
    glowColor: "rgba(196, 92, 62, 0.3)",
    dragonStyle: "winged",
    image: "/dragons/europe-medieval-dragon.png",
  },
  {
    id: "norse",
    name: "Jormungandr",
    nameZh: "約爾蒙岡德",
    tradition: "Norse",
    traditionZh: "北歐",
    region: "North Atlantic & Scandinavia",
    regionZh: "北大西洋與斯堪地那維亞",
    associatedWith: "Sea, fate, encirclement, storms, Ragnarok",
    associatedWithZh: "海洋、命運、環繞、風暴、諸神黃昏",
    description:
      "In Norse myth, the world-serpent does not merely haunt the ocean — it measures it. Jormungandr coils through the northern sea as a sign of cosmic scale, bound to storm, doom, and the final breaking of the world.",
    descriptionZh:
      "在北歐神話裡，世界巨蛇不只是棲伏於海中，更像是衡量海洋尺度的存在。約爾蒙岡德盤繞北海，象徵宇宙性的巨大規模，與風暴、末日與世界的最終崩裂相連。",
    atmosphere:
      "In the northern waters, the serpent circles the edge of fate itself.",
    atmosphereZh: "在北方海域，巨蛇盤繞著命運本身的邊界。",
    mapPosition: { x: 43.8, y: 19.8 },
    color: "#93a7a0",
    glowColor: "rgba(147, 167, 160, 0.28)",
    dragonStyle: "storm",
    image: "/dragons/norse-north-atlantic-jormungandr.png",
  },
  {
    id: "slavic",
    name: "Zmey",
    nameZh: "茲梅伊",
    tradition: "Slavic / Eastern European",
    traditionZh: "斯拉夫 / 東歐",
    region: "Eastern Europe",
    regionZh: "東歐",
    associatedWith: "Storms, swamps, forests, folklore, elemental fear",
    associatedWithZh: "風暴、沼澤、森林、民間傳說、元素性的恐懼",
    description:
      "These dragons do not always dwell in castles. Some belong to storm, swamp, and folktale fear. Multi-headed and shape-shifting, they embody nature's unpredictable wrath.",
    descriptionZh:
      "這些龍並不總是棲身於城堡之中。有些屬於風暴、沼澤與民間故事裡的原始恐懼。牠們多頭、善變，象徵自然難以預測的暴烈面貌。",
    atmosphere:
      "These dragons do not always dwell in castles. Some belong to storm, swamp, and folktale fear.",
    atmosphereZh: "這些龍不總住在城堡裡，有些屬於風暴、沼澤與民間故事裡的恐懼。",
    mapPosition: { x: 56.8, y: 20.8 },
    color: "#6b8f71",
    glowColor: "rgba(107, 143, 113, 0.3)",
    dragonStyle: "storm",
    image: "/dragons/slavic-eastern-europe-zmey-storm-serpent-variant.png",
  },
  {
    id: "egypt",
    name: "Apep",
    nameZh: "阿佩普",
    tradition: "Egyptian",
    traditionZh: "埃及",
    region: "Egypt & North Africa",
    regionZh: "埃及與北非",
    associatedWith: "Night, eclipse, chaos, the underworld, cosmic threat",
    associatedWithZh: "黑夜、蝕象、混沌、冥界、宇宙威脅",
    description:
      "Apep is not a guardian dragon but a force of devouring darkness. In Egyptian cosmology, it rises each night against the solar journey of Ra, a vast serpent of chaos that must be resisted again and again.",
    descriptionZh:
      "阿佩普並非守護型的龍蛇，而是吞噬一切的黑暗之力。在埃及宇宙觀中，它每夜都起身對抗拉神的太陽航程，是必須一再被抵禦的混沌巨蛇。",
    atmosphere:
      "In Egypt, the serpent waits in the dark beyond the sun's passage.",
    atmosphereZh: "在埃及，巨蛇潛伏於太陽行經之後的黑暗深處。",
    mapPosition: { x: 54.5, y: 28.2 },
    color: "#d1b07a",
    glowColor: "rgba(209, 176, 122, 0.3)",
    dragonStyle: "cosmic",
    image: "/dragons/egypt-north-africa-apep.png",
  },
  {
    id: "persia",
    name: "Azhdaha",
    nameZh: "阿茲達哈",
    tradition: "Persian / Middle Eastern",
    traditionZh: "波斯 / 中東",
    region: "Middle East & Persia",
    regionZh: "中東與波斯",
    associatedWith: "Cosmic struggle, deserts, stars, ancient kings",
    associatedWithZh: "宇宙對抗、沙漠、星辰、古代王權",
    description:
      "Some dragon forms emerge where myth speaks in stars, deserts, kings, and cosmic struggle. The Azhdaha embodies primordial chaos — a force that heroes and empires must overcome.",
    descriptionZh:
      "有些龍的形象誕生於星辰、沙漠、王權與宇宙對抗交織的神話之中。阿茲達哈象徵原初混沌，是英雄與帝國都必須跨越的力量。",
    atmosphere:
      "Some dragon forms emerge where myth speaks in stars, deserts, kings, and cosmic struggle.",
    atmosphereZh: "有些龍誕生於星辰、沙漠、王權與宇宙對抗交織的神話語言之中。",
    mapPosition: { x: 59.6, y: 25.8 },
    color: "#d4a574",
    glowColor: "rgba(212, 165, 116, 0.3)",
    dragonStyle: "cosmic",
    image: "/dragons/middle-east-persia-cosmic-serpent-chaos-dragon.png",
  },
  {
    id: "australia",
    name: "Rainbow Serpent",
    nameZh: "彩虹蛇",
    tradition: "Aboriginal Australian",
    traditionZh: "澳洲原住民",
    region: "Australia",
    regionZh: "澳洲",
    associatedWith: "Creation, rain, waterways, ancestral law, renewal",
    associatedWithZh: "創世、降雨、水道、祖靈法則、更新",
    description:
      "Across many Aboriginal Australian traditions, the Rainbow Serpent is a being of origin, movement, and living law. It shapes waterways, carries rain, and marks the land as a place formed by ancestral presence rather than empty ground.",
    descriptionZh:
      "在許多澳洲原住民族傳統中，彩虹蛇是關於起源、流動與活的法則的存在。它塑造水道，攜來降雨，也使大地成為祖靈存在所形成之地，而不是一片空白土地。",
    atmosphere:
      "In Australia, the serpent moves through rain, earth, and the deep memory of creation.",
    atmosphereZh: "在澳洲，蛇穿行於雨、土地與創世的深層記憶之中。",
    mapPosition: { x: 77.4, y: 40.5 },
    color: "#cba177",
    glowColor: "rgba(203, 161, 119, 0.28)",
    dragonStyle: "flowing",
    image: "/dragons/australia-rainbow-serpent.png",
  },
  {
    id: "polynesia",
    name: "Taniwha",
    nameZh: "塔尼法",
    tradition: "Polynesian / Maori",
    traditionZh: "玻里尼西亞 / 毛利",
    region: "South Pacific & Aotearoa",
    regionZh: "南太平洋與奧特亞羅瓦",
    associatedWith: "Sea routes, estuaries, guardianship, warning, ancestral power",
    associatedWithZh: "海路、河口、守護、警示、祖靈之力",
    description:
      "In Polynesian and Maori traditions, the great water-being is not only feared but respected as a guardian of channels, coasts, and thresholds. The taniwha belongs to tidal places where danger and protection are often the same force.",
    descriptionZh:
      "在玻里尼西亞與毛利傳統中，這種巨大的水中存在不僅令人敬畏，也被尊為水道、海岸與門檻之地的守護者。塔尼法棲於潮汐出沒之處，在那裡，危險與保護往往是一體兩面。",
    atmosphere:
      "Across the South Pacific, serpent guardians move through surf, reefs, and ancestral waters.",
    atmosphereZh: "在南太平洋，蛇形守護者穿行於浪頭、礁岸與祖靈之水之間。",
    mapPosition: { x: 84.0, y: 46.0 },
    color: "#7fb7b9",
    glowColor: "rgba(127, 183, 185, 0.3)",
    dragonStyle: "flowing",
    image: "/dragons/polynesia-pacific-oceanic-serpent-sea-guardian.png",
  },
];
