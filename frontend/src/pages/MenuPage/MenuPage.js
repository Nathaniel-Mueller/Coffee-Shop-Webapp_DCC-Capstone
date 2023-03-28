import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import './MenuPage.css'

const MenuPage = (props) => {

    const [user] = useAuth()

    return ( 
        <div>
            <h1>Menu</h1>
            <h3 className='text-align'>Lattes</h3>
            <div className='card-container'>
                <div className='menu-card'>
                    <h2>Caramel Latte</h2>
                    <p>Caramel Latte Description</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#CaramelLatte'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>White Chocolate Mocha</h2>
                    <p>desc</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#WhiteChocolateMocha'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Vanilla Latte</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#VanillaLatte'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Chai Tea Latte</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#ChaiTeaLatte'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Skinny Vanilla Latte</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#SkinnyVanillaLatte'>click to recipe</Link>}
                </div>
                <h3 className='text-align'>Frappes</h3>
                <div className='menu-card'>
                    <h2>Caramel Frappe</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#CaramelFrappe'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Toasted Caramel Frappe</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#ToastedCaramelFrappe'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Monster Bean</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#MonsterBean'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Cold Brew Malt</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#ColdBrewMalt'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>S'mores Frappe</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#SmoresFrappe'>click to recipe</Link>}
                </div>
                <h3 className='text-align'>Other</h3>
                <div className='menu-card'>
                    <h2>Infused Redbull</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#Redbull'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Green Tea</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#GreenTea'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Passion Fruit Tea</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#PassionTea'>click to recipe</Link>}
                </div>
                <div className='menu-card'>
                    <h2>Sweet Cream Cold Brew</h2>
                    <p>words</p>
                    {(user && user.is_staff) && <Link to='/menu/recipes#SweetCream'>click to recipe</Link>}
                </div>
            </div>
        </div>
     );
}
 
export default MenuPage;