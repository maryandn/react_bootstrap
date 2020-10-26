import React from "react";
import SideBar from "../../component/sideBar";
import Article from "../../component/article";

function GlobalPage() {
    return (
        <div className="row m-0">
            <div className="col-2">
                <SideBar/>
            </div>
            <div className="col-10">
                <Article/>
            </div>
        </div>
    )
}

export default GlobalPage;
