import Link from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface NavBarProps {
    isAuth: Boolean,
    openAuthModal: Function,
}

export const NavBar: React.FC<NavBarProps> = ({ isAuth, openAuthModal }) => {
    const router = useRouter()
    const { orderBy } = router.query;

    return(
        <>
            <section className="wrapper">
                <div className="main-header">
                    <NextLink href="/">
                        <a className="header__link header__link_home" title="Feed"/>
                    </NextLink>
                    { isAuth 
                        ?   <>
                                <NextLink href="/profile">
                                    <a className="header__link header__link_profile" title="Profile"/>
                                </NextLink>
                                <NextLink href="/">
                                    <a className="header__link header__link_likes" title="Liked tweets"/>
                                </NextLink>
                            </> 
                        :   <>
                                <a className="header__link header__link_profile" title="Profile" onClick={() => openAuthModal()}/>
                                <a className="header__link header__link_likes" title="Liked tweets" onClick={() => openAuthModal()}/>
                            </>
                    }
                    <a href={`${orderBy === undefined ? "/?orderBy=LIKES_COUNT" : '/'}`} className="header__link header__link_sort" title="Sort tweets"/>
                </div>
            </section>
        </>
    );
}