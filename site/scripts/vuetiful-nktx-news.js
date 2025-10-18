const markdownConverter = new showdown.Converter();

const { createApp, ref, onMounted } = Vue

const newsApp = Vue.createApp({
  setup() {
    const news = ref([])

    onMounted(() => {
      fetch('data/news.json')
        .then(response => response.json())
        .then(data => {

          data.forEach(item => {
            item.date = new Intl.DateTimeFormat('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(item.date));

            item.title = markdownConverter.makeHtml(item.title);

            item.content = item.content.map(c => markdownConverter.makeHtml(c));
          });

          news.value = data;
        })
        .catch(error => {
          console.error('Error loading data/news.json:', error);
        });
    })

    return { news };
  }
});

newsApp.mount('#news-app');
