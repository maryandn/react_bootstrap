import React from "react";
import SideBar from "../../component/sideBar";
import Article from "../../component/article";

function GlobalPage() {
    return (
        <div className="row m-0">
            <div className="col-3">
                <SideBar/>
            </div>
            <div className="col-9">
                <Article/>
            </div>
        </div>
    )
}

export default GlobalPage;
