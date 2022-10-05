const App = () => {
  const [products, setProducts] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });
  React.useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) {
      return;
    }
    fetch("/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProducts();
        console.log(data);
        setForm({
          name: "",
          price: "",
        });
      });
  }
  function updateForm(event, field) {
    if (field === "name") {
      setForm({
        ...form,
        name: event.target.value,
      });
    } else if (field === "price") {
      setForm({
        ...form,
        price: event.target.value,
      });
    }
  }
  function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProducts();
        console.log(data);
      });
  }
  return (
    <>
      <div className='card'>
        <div className='card-header'> Add a Product </div>
        <div className='card-body'>
          <form onClick={handleSubmit}>
            <input
              type='text'
              value={form.name}
              onChange={() => updateForm(event, "name")}
              placeholder='Producy name ...'
              className='form-control mt-3'
            />
            <input
              type='text'
              value={form.price}
              onChange={() => updateForm(event, "price")}
              placeholder='Producy price ...'
              className='form-control mt-3'
            />
            <button type='submit' className='btn btn-primary mt-3'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ul className='list-group mt-4'>
        {products.map((product) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center'
            key={product.id}
          >
            <div>
              <strong> {product.name} </strong>${product.price}
            </div>
            <button className='btn' onClick={() => deleteProduct(product.id)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-trash3'
                viewBox='0 0 16 16'
              >
                <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
