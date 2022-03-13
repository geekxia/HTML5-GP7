import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

function useLocation() {
  const route = useRoute()

  console.log('route', route.fullPath)
  const pathname = route.fullPath

  return {
    pathname
  }
}

// useSelector(state=>state.cnode.msg)
function useSelector(fn) {
  const store = useStore()
  return computed(()=>fn(store.state))
}

function useDispatch() {
  const store = useStore()
  return store.dispatch
}

export {
  useLocation,
  useSelector,
  useDispatch
}
