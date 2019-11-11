import Vue from 'vue';
import axios from "axios";

const skill = {
    template: "#skill",
    props: ["skillName", "skillPercent"],
    methods: {
        drawColoredCircle() {
            const circle = this.$refs["color-circle"];
            const dashArray = parseInt(
                getComputedStyle(circle).getPropertyValue("stroke-dasharray")
            );
            const percent = (dashArray / 100) * (100 - this.skillPercent);

            circle.style.strokeDashoffset = percent;
        }
    },
    mounted() {
        this.drawColoredCircle();
    }

};

const skillsRow = {
    template: "#skills-row",
    components: { skill },
    props: ['skill']
};

new Vue({
    el: "#skills-component",
    template: "#skills-list",
    data: () => ({
        skills: []
    }),
    components: { skillsRow },
    async created() {
        const responsiveCategory  = await axios.get('https://webdev-api.loftschool.com/categories/192');
       
        const categories =  responsiveCategory.data;
        this.skills = categories;        
    }
});