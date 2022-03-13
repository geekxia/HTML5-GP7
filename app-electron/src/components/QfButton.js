import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class QfButton extends Vue {
  mounted() {
    console.log('QfButton mounted')
  }
  render() {
    return (
      <div>
        <h2>测试JSX语法</h2>
      </div>
    )
  }
}
