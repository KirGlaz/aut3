
  export default {
    namespaced: true,
    state: {
      works: [],
      correntWork: {}
    },
    mutations: {
      SET_WORKS(state, works) {
        state.works = works;
      },
      ADD_WORK(state, work) {
        state.works.unshift(work);
      },
      REMOVE_WORKS(state, deletedWork) {
        state.works = state.works.filter(work => work.id !== deletedWork);
      },      
      NON(state, workId) {
        state.correntWork = state.works.filter(work => work.id === workId)[0]        
      },
      UPDATE_WORK(state, updateWork) {
        state.works = state.works.map(work =>
          work.id === updateWork.id ? updateWork : work
        )}      
    },
    actions: {
      async addWork({ commit }, work) {  
        const formData = new FormData();

        Object.keys(work).forEach(key => {
            formData.append(key, work[key]);
        });      
        try { 
          console.log(work)         
          const { data } = await this.$axios.post("/works", formData);          
          commit("ADD_WORK", data);
        } catch (error) {          
          throw new Error(
            error.response.data.error || error.response.data.message
          );
        }
      },
      async fetchWorks({ commit }) {
        try {
          const { data } = await this.$axios.get("/works/192");          
          commit("SET_WORKS", data);
        } catch (error) {console.log(error)}
      },
      async removeWorks({ commit }, id) {
        console.log(id);
        try {
          const { data } = await this.$axios.delete(`/works/${id}`);
          commit("REMOVE_WORKS", id);
        } catch (error) {}
      },
      async editWork({ commit }, editedWork) {
        console.log("commit", editedWork)
        try {
          const { data } = await this.$axios.post(
            `/works/${editedWork.id}`,
            editedWork
          );        
          commit("UPDATE_WORK", data.work);        
        } catch (error) {console.log(error)}       
      },      
    }
  };