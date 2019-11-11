export default {
  namespaced: true,
  state: {
    comments: [],
    correntComment: {}
  },
  mutations: {
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT(state, comment) {
      state.comments.unshift(comment);
    },
    REMOVE_COMMENTS(state, deletedComment) {
      state.comments = state.comments.filter(comment => comment.id !== deletedComment);
    },      
    NONS(state, commentId) {
      state.correntComment = state.comments.filter(comment => comment.id === commentId)[0]        
    },
    UPDATE_COMMENT(state, updateComment) {
      console.log(updateComment)
      state.comments = state.comments.map(comment =>
        comment.id === updateComment.id ? updateComment : comment
      )}      
  },
  actions: {
    async addComment({ commit }, comment) {  
      const formData = new FormData();

      Object.keys(comment).forEach(key => {
          formData.append(key, comment[key]);
      });      
      try { 
        console.log(comment)         
        const { data } = await this.$axios.post("/reviews", formData);          
        commit("ADD_COMMENT", data);
      } catch (error) {          
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchComments({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/192");          
        commit("SET_COMMENTS", data);
      } catch (error) {console.log(error)}
    },
    async removeComments({ commit }, id) {
      console.log(id);
      try {
        const { data } = await this.$axios.delete(`/reviews/${id}`);
        commit("REMOVE_COMMENTS", id);
      } catch (error) {}
    },
    async editComment({ commit }, editedComment) {
      console.log("commit", editedComment)
      try {
        const { data } = await this.$axios.post(
          `/reviews/${editedComment.id}`,
          editedComment
        ); 
        console.log(data)       
        commit("UPDATE_COMMENT", data.review);        
      } catch (error) {console.log(error)}       
    },      
  }
};