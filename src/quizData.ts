export interface QuizOption {
  text: string;
  // Maps a comic id to a score increase (e.g. { false_love_signal_manga: 10 })
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  title: string;
  description?: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'genre',
    title: '目前想看哪一種類型的故事？',
    options: [
      {
        text: '香噴噴的 BL 耽美愛情',
        scores: {
          'false_love_signal_manga': 10,
          'calculus_manga': 10,
          'how_to_date_a_dragon_manga': 10
        }
      },
      {
        text: '輕鬆爆笑的日常生活四格',
        scores: {
          'joyqul_daily_manga': 40
        }
      }
    ]
  },
  {
    id: 'mood',
    title: '感情線的甜度/虐度偏好？',
    options: [
      {
        text: '甜到蛀牙、心跳加速的輕鬆甜甜戀愛',
        scores: {
          'how_to_date_a_dragon_manga': 10,
          'calculus_manga': 8,
          'joyqul_daily_manga': 5
        }
      },
      {
        text: '帶著酸甜曖昧、拉扯對峙的輕度心酸戀愛',
        scores: {
          'false_love_signal_manga': 12
        }
      },
      {
        text: '不想要感情線',
        scores: {
          'joyqul_daily_manga': 40
        }
      }
    ]
  },
  {
    id: 'setting',
    title: '比較喜歡哪種背景？',
    options: [
      {
        text: '成熟大人味的職場浪漫',
        scores: {
          'false_love_signal_manga': 12
        }
      },
      {
        text: '青春魅力四射的學園',
        scores: {
          'how_to_date_a_dragon_manga': 12,
          'calculus_manga': 8
        }
      },
      {
        text: '奇幻世界',
        scores: {
          'how_to_date_a_dragon_manga': 12
        }
      }
    ]
  },
  {
    id: 'status',
    title: '你是哪一派？',
    options: [
      {
        text: '喜歡一口氣看到結局的「已完結」黨',
        scores: {
          'false_love_signal_manga': 10,
          'calculus_manga': 10
        }
      },
      {
        text: '享受每週追更與心動等待的「連載中」黨',
        scores: {
          'how_to_date_a_dragon_manga': 10,
          'joyqul_daily_manga': 10
        }
      }
    ]
  },
  {
    id: 'hair',
    title: '比較喜歡？',
    options: [
      {
        text: '黑髮受',
        scores: {
          'false_love_signal_manga': 10,
          'calculus_manga': 10
        }
      },
      {
        text: '黑髮攻',
        scores: {
          'how_to_date_a_dragon_manga': 10
        }
      }
    ]
  },
  {
    id: 'dynamics',
    title: '比較喜歡哪種CP互動感？',
    options: [
      {
        text: '攻主動',
        scores: {
          'false_love_signal_manga': 12
        }
      },
      {
        text: '受主動',
        scores: {
          'calculus_manga': 12
        }
      },
      {
        text: '都很主動',
        scores: {
          'how_to_date_a_dragon_manga': 12
        }
      }
    ]
  },
  {
    id: 'tags',
    title: '最想看哪個標籤？',
    options: [
      {
        text: '忠犬攻',
        scores: {
          'calculus_manga': 12,
          'false_love_signal_manga': 4,
          'how_to_date_a_dragon_manga': 2
        }
      },
      {
        text: '誘受',
        scores: {
          'calculus_manga': 12
        }
      },
      {
        text: '腹黑攻',
        scores: {
          'false_love_signal_manga': 12
        }
      },
      {
        text: '天然撩攻',
        scores: {
          'how_to_date_a_dragon_manga': 12
        }
      }
    ]
  }
];
