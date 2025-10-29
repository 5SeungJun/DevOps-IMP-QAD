export const chartKeyMap = {
  vulner: "보안 취약점",
  security: "보안 경고",
  bug: "오류",
  smell: "개선 권장",
  complexity: "복잡도",
};

export const chartColors = {
  "보안 취약점": "#f44336",
  "보안 경고": "#ff9800",
  오류: "#5e35b1",
  "개선 권장": "#2196f3",
  복잡도: "#4caf50",
};

export const projectData = {
  ProjectAlpha: {
    testDate: "2025.10.15",
    summary: {
      vulner: 45,
      security: 60,
      bug: 15,
      smell: 30,
      complexity: 120,
      total: 270,
    },
    chartData: [
      {
        name: "07일",
        "보안 취약점": 30,
        "보안 경고": 45,
        오류: 10,
        "개선 권장": 20,
        복잡도: 100,
      },
      {
        name: "08일",
        "보안 취약점": 35,
        "보안 경고": 50,
        오류: 12,
        "개선 권장": 25,
        복잡도: 105,
      },
      {
        name: "09일",
        "보안 취약점": 40,
        "보안 경고": 55,
        오류: 14,
        "개선 권장": 28,
        복잡도: 110,
      },
      {
        name: "10일",
        "보안 취약점": 45,
        "보안 경고": 60,
        오류: 15,
        "개선 권장": 30,
        복잡도: 120,
      },
    ],
  },
  ProjectBeta: {
    testDate: "2025.10.13",
    summary: {
      vulner: 10,
      security: 25,
      bug: 5,
      smell: 10,
      complexity: 50,
      total: 100,
    },
    chartData: [
      {
        name: "07일",
        "보안 취약점": 8,
        "보안 경고": 20,
        오류: 4,
        "개선 권장": 8,
        복잡도: 45,
      },
      {
        name: "08일",
        "보안 취약점": 10,
        "보안 경고": 25,
        오류: 5,
        "개선 권장": 10,
        복잡도: 50,
      },
      {
        name: "09일",
        "보안 취약점": 12,
        "보안 경고": 28,
        오류: 6,
        "개선 권장": 12,
        복잡도: 55,
      },
      {
        name: "10일",
        "보안 취약점": 10,
        "보안 경고": 25,
        오류: 5,
        "개선 권장": 10,
        복잡도: 50,
      },
    ],
  },
};

export const projectKeys = Object.keys(projectData);
