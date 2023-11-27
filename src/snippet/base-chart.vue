<template>
    <div ref="chart" :style="{width: width, height: height}"></div>
</template>

<script>
/*
基于echarts封装的简单vue组件
*/
import echarts from 'echarts';

export default {
    name: 'base-chart',
    data() {
        return {
            chart: null
        };
    },
    props: {
        option: {
            type: Object,
            required: true
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '400px'
        }
    },
    watch: {
        option: {
            deep: true,
            handler: newOption => {
                if (this.chart) {
                    this.chart.setOption(newOption);
                }
            }
        }
    },
    mounted() {
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.option);
        // 监听data-zoom事件
        this.chart.on('datazoom', param => {
            const {start, end} = param;
            this.$emit('data-zoom', {
                start,
                end
            });
        });
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
};
</script>
