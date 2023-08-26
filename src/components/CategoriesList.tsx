type CategoriesListProps = {
    categories: Array<string>
}

const CategoriesList : React.FC<CategoriesListProps> = ({ categories }) => {
    return (
        <aside id="categories-list" className="space-y-4 p-4 pb-8 bg-white border-t-4 border-t-primary shadow h-[70vh] overflow-hidden sticky top-10">
        <h3 className="text-xl font-bold">Categories</h3>

        <hr />

        <div className="overflow-scroll h-full">
          {
            categories && categories.map((category, index) => <a className="block py-1.5 px-2.5 text-lg transition duration-200 hover:bg-primary/20 rounded hover:text-primary active:text-primary active:font-bold" href={`/${category}`} key={index}>{category}</a>)
          }
        </div>
      </aside>
    )
}

export default CategoriesList