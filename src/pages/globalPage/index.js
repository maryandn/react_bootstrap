import React from "react";
import SideBar from "../../component/sideBar";
import Article from "../../component/article";

function GlobalPage() {
    return (
        <div class="row m-0">
            <div class="col-2">
                <SideBar/>
            </div>
            <div class="col-10">
                <Article/>
            </div>
        </div>
    )
}

export default GlobalPage;
