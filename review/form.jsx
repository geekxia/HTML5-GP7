export default () => {
  useEffect(()=>{
    const zooz = localStorage.getItem('zooz')
    form.setFieldsValue({zooz})
  }, [])
}
