import { Link } from "react-router-dom"

export default () => {

    const footerNavs = [
        {
            path: '/',
            name: 'About'
        },
        {
            path: '/',
            name: 'Blog'
        },
        
        {
            path: '/',
            name: 'Team'
        },
        {
            path: '/',
            name: 'Careers'
        },

        {
            path: '/',
            name: 'Suuport'
        }
    ]

    return (
        <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <h1 className="text-blue-800 text-5xl mb-5">SHOPIFFY </h1>
                <p className="leading-relaxed mt-2 text-[15px]">
                    Shopify has been the industry's standard e-commerce ever since the 2010
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <li className=" hover:text-gray-800">
                            <Link key={idx} to={item.path}>
                                { item.name }
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-10 sm:mt-0 justify-self-center">
                    &copy; 2022 Float UI All rights reserved.
                </div>
           
            
        </footer>
    )
}
