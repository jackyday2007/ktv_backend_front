<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>編號</th>
            <th>發生日期(含時間)</th>
            <th>事件</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="problem in problems" :key="problem.problemId">
            <td>{{ problem.problemId }}</td>
            <td>{{ formatDateTime(problem.eventDate) }}</td>
            <td>{{ problem.eventCase }}</td>
            <td>{{ problem.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProblemTable',
    data() {
      return {
        problems: [
          {
            problemId: 1,
            eventDate: "2024-06-30 13:13:13.0",
            eventCase: "桌子壞掉",
            status: "未使用"
          },
          {
            problemId: 2,
            eventDate: "2024-07-01 14:15:16.0",
            eventCase: "椅子壞掉",
            status: "已修復"
          }
          // Add more problems as needed
        ]
      };
    },
    methods: {
      formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  