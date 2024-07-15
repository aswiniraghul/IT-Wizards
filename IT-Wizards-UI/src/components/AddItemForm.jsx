const AddItemForm = () => {
  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Item
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Item Name
              </label>
              <textarea
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="The name of the item"
                required
                onChange={(e) => setType(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="3"
                placeholder="A brief description of the item, any possible adverse side effects, etc."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="itemCategory"
                className="block text-gray-700 font-bold mb-2"
              >
                Item Category
              </label>
              <textarea
                id="itemCategory"
                name="itemCategory"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="A category for the item"
                required
                onChange={(e) => setSalary(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter a price (to the nearest penny)"
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="currentInventory"
                className="block text-gray-700 font-bold mb-2"
              >
                Current Inventory
              </label>
              <input
                type="text"
                id="currentInventory"
                name="currentInventory"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter current inventory for the item"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full hover:text-green-600 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddItemForm;
