$(document).ready(() => {

    const xhr = new XMLHttpRequest();
    xhr.open("get", "DreamDictionary.json", true);
    xhr.send();
    xhr.onload = () => {
        let response = JSON.parse(xhr.responseText);
        let blogHeader = response["BlogHeader"];
        let blogDetail = response["BlogDetail"];

        // category page
        blogHeader.forEach((category, index) => {
            // creating column dynamically
            let column = $(`<div class="col-md-3 mb-3"></div>`);
            let card = $(`<div class="card border border-2 rounded-3"></div>`);
            let cardBody = $(`<div class="card-body"></div>`);
            let title = $(`<h2 class="card-title text-center"></h2>`);
            let text = $(`<p class="card-text text-center"></p>`);

            title.text(category.BlogHead);  // adding ကကြီး ခခွေး 
            text.text(category.BlogTitle); // adding home page texts

            // adding css to styling cards
            card.css("height", "220px");
            card.css("cursor", "pointer");
            card.css("background", "#d1cfe8");
            card.css("border-color", "#6c757d");

            title.css("font-size", "4em");
            title.css("font-weight", "500");
            title.css("font-color", "#7a6f9b");

            text.css("margin-top", "50px");
            text.css("font-color", "#708090");

            card.attr("value", category.BlogId);

            // ဟ နဲ့ အ ကို အလယ်ပို့ 
            if (index >= blogHeader.length - 2) {
                column.addClass("mx-auto");
            }

            // adding to homepage
            cardBody.append(title, text);
            card.append(cardBody);
            column.append(card);
            $(".dreamCategory").append(column);
        })

        // second page and searchBox part
        $(".card").on("click", function () {
            let clickedBlogId = $(this).attr("value");

            let clickedBlogDetails = blogDetail.filter(blog => blog.BlogId == clickedBlogId);
            // console.log(clickedBlogDetails);

            if (clickedBlogDetails.length > 0) {
                // ရှိပြီးသားနှစ်ခုကိုဖျောက် 
                $(".homePage").removeClass("d-block").addClass("d-none");
                $(".dreamCategory").removeClass("d-flex").addClass("d-none");
                $(".dreamList").removeClass("d-none").addClass("d-flex");

                // logo ဖျောက် 
                $(".big-letter").removeClass("d-block").addClass("d-none");

                //back btn searchbox appear
                $(".back").removeClass("d-none").addClass("d-block");
                $(".searchBox").removeClass("d-none").addClass("d-block");

                // Clear existing content in dreamList
                $(".dreamList").empty();

                // content ထဲ့ 
                clickedBlogDetails.forEach(blogContent => {
                    let row = $(`<div class="border border-2 rounded-3 border-dark mb-5 p-5"></div>`);
                    let textHolder = $(`<p class="card-text text-center"></p>`);
                    let idHolder = $(`<h2 class="h5"></h2>`);
                    let textId = "အိပ်မက်အမှတ်စဥ်: " + blogContent.BlogDetailId;
                    let text = blogContent.BlogContent;

                    textHolder.text(text);
                    idHolder.text(textId);

                    row.append(textHolder);
                    $(".dreamList").append(idHolder, row);
                });
                // serach box autocomplete
                $(".searchBox").on("keyup", (event) => {

                    $(".dreamList").empty();

                    let searchText = event.target.value.toLowerCase();
                    // console.log(searchText);
                    let filterText = clickedBlogDetails.filter(content => {
                        return content.BlogContent.toLowerCase().includes(searchText);
                    })
                    // filterText.forEach(text => console.log(text.BlogContent));

                    // searchBox သုံးရင် height ကိုပြင်
                    if (filterText.length <= 2 && filterText.length >= 0) {
                        $("body").css("height", "100vh");
                    }
                    else {
                        $("body").css("height", "auto");
                    }

                    filterText.forEach(filterContent => {
                        let row = $(`<div class="border border-2 rounded-3 border-dark mb-5 p-5"></div>`);
                        let textHolder = $(`<p class="card-text text-center"></p>`);
                        let idHolder = $(`<h2 class="h5"></h2>`);
                        let textId = "အိပ်မက်အမှတ်စဥ်: " + filterContent.BlogDetailId;
                        let text = filterContent.BlogContent;

                        textHolder.text(text);
                        idHolder.text(textId);

                        row.append(textHolder);
                        $(".dreamList").append(idHolder, row);
                    })
                });
            }
            else {
                console.error(`There was an error ${clickedBlogId}`);
            }
        })

        // back btn
        $(".back").on("click", function (event) {

            event.preventDefault();

            $(".homePage").removeClass("d-none").addClass("d-block");
            $(".dreamCategory").removeClass("d-none").addClass("d-flex");
            $(".dreamList").removeClass("d-flex").addClass("d-none");

            // logo ဖျောက် 
            $(".big-letter").removeClass("d-none").addClass("d-block");

            //back btn searchbox appear
            $(".back").removeClass("d-block").addClass("d-none");
            $(".searchBox").removeClass("d-block").addClass("d-none");

            // Clear existing content in dreamList
            $(".dreamList").empty();

            // back btn နှိပ် height ပြန်ပြင်
            $("body").css("height", "auto");

        })

    };
});