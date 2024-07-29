$(document).ready(() => {
    let M = !1,
        C = !1;
    let t, I = null;
    $.getJSON("https://rbxidle.com/petdesc.json", function(e) {
        t = e, console.log(t)
    });

    function N() {
        window.api.send("toMain", {
            req: "[gv]"
        })
    }
    let e = document.getElementById("minerCanvas"),
        n = e.getContext("2d");
    var E;
    const r = 320,
        o = 192,
        s = .75 * r,
        l = .75 * o;
    $("#upModal").modal({
        show: !1
    }), window.api.receive("fromMain", r => {
        var o, s, l;
        switch ("whitelist" == r.substr(0, 9) ? Swal.fire({
                title: "Could not find miner.",
                text: "The miner could not be found. This could be because your anti-virus has removed it. To fix this, you can attempt to whitelist the RBXIDLE folder with your anti-virus and reinstall the program, or open up a support ticket in our Discord server and someone will walk you through troubleshooting.",
                icon: "error",
                confirmButtonText: "Ok"
            }) : "sdQualify" == r.substr(0, 9) ? "true" == r.split(":")[1] && $("#downloadModule").modal("show") : "getModule" == r.substr(0, 9) ? "downloaded" == (o = r.split(":"))[1] ? (window.api.send("toMain", {
                req: "setupSD"
            }), $("#StartMining").attr("disabled", !0), document.getElementById("StartMining").innerHTML = "Initializing...", console.log("ai download complete")) : "setup" == o[1] ? console.log("ai setup complete") : "sd installed" == o[1] ? ($("#StartMining").attr("disabled", !1), document.getElementById("StartMining").innerHTML = "Start Earning", Swal.fire({
                title: "Module setup complete!",
                text: 'The module setup has completed! All you need to do now is click "Start Earning" on the home page!',
                icon: "success",
                confirmButtonText: "Nice!"
            })) : (o = Math.min(Math.max(1, Math.round(100 * o[1], 2)), 100), console.log(o), $("#currentDownloadPerc").text(String(o)), $("#moduleProgress").width(o + "%"), 100 == o && ($("#downloading").modal("hide"), Swal.fire({
                title: "Downloaded modules!",
                text: "The AI modules have been downloaded and installed. Since this is the first time you have downloaded modules, it may take up to 30 minutes for the setup to complete depending on your internet connection. Please be patient, and if you have any questions, please join our Discord server and ask for help!",
                icon: "success",
                confirmButtonText: "Nice!"
            }))) : "closed" == r ? ($("#stopBTN").attr("hidden", !0), $("#StartMining").removeAttr("hidden"), $("statusDiv").attr("data-mdb-color", "warning"), C || (document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-warning", document.getElementById("statusIcon").className = "fas fa-exclamation-triangle me-3", document.getElementById("status").innerHTML = "IDLE"), document.getElementById("StartMining").innerHTML = "Start Earning", clearInterval(E), M = !1, $("#StartMining").removeAttr("disabled")) : "noTarget" == r ? ($("#stopBTN").attr("hidden", !0), $("#StartMining").removeAttr("hidden"), $("statusDiv").attr("data-mdb-color", "warning"), C || (document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-warning", document.getElementById("statusIcon").className = "fas fa-exclamation-triangle me-3", document.getElementById("status").innerHTML = "IDLE"), document.getElementById("StartMining").innerHTML = "Start Earning", clearInterval(E), M = !1, $("#StartMining").removeAttr("disabled"), Swal.fire({
                title: "No supported hardware enabled",
                text: "Please enable supported hardware to start mining. You can do this with the switches next to your detected hardware. If your GPU is not supported, you can still use your CPU!",
                icon: "error",
                confirmButtonText: "Ok"
            })) : "demoted" == r ? (console.log("DEMOTED"), M = !1, (o = {
                req: "startMining",
                intensity: 100
            }).username = L, o.region = 1, window.api.send("toMain", o)) : "notAd" == r ? Swal.fire({
                title: "Current user does not have admin permissions.",
                text: 'The current user does not have windows admin permissions to execute this task. Please open "task manager" and delete the task named "idlr". This is the RBXIDLE task that controls the idle mining, and will turn it off. If you need further assistance, please join our Discord server.',
                icon: "error",
                confirmButtonText: "Ok"
            }) : "closedCPU" == r ? ($("#stopLegacy").attr("hidden", !0), $("#StartLegacy").removeAttr("hidden"), $("statusDiv").attr("data-mdb-color", "warning"), M || (document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-warning", document.getElementById("statusIcon").className = "fas fa-exclamation-triangle me-3", document.getElementById("status").innerHTML = "IDLE"), document.getElementById("StartLegacy").innerHTML = "Start", C = !1, $("#StartLegacy").removeAttr("disabled")) : "[r]" == r.substr(0, 3) && (-1 !== r.indexOf("ERROR: No connection with") && Swal.fire({
                title: "Failed to connect",
                text: "You have failed to connect to the mining servers. You can try stopping the miner and restarting. If this does not work, please contact support in our Discord channel.",
                icon: "error",
                confirmButtonText: "Ok"
            }), -1 !== r.indexOf("Windows TDR DDI delay value is missing")) && Swal.fire({
                title: "Failed to connect",
                text: "Windows TDR DDI delay value is missing or invalid.",
                icon: "error",
                confirmButtonText: "Ok"
            }), "[r]" == r.substr(0, 3) && 0 == M ? ($("#StartMining").attr("hidden", !0), $("#stopBTN").removeAttr("hidden"), $("statusDiv").attr("data-mdb-color", "success"), document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-success", document.getElementById("statusIcon").className = "fas fa-check-circle me-3", document.getElementById("status").innerHTML = "RUNNING", D = !1, M = !0, document.getElementById("stopBTN").innerHTML = "Stop", setTimeout(function() {
                $("#stopBTN").removeAttr("disabled")
            }, 500), Swal.fire({
                icon: "success",
                title: "Nice!",
                text: "Please note that miner setup can take up to 30 minutes in some cases before you start earning, so don't get discouraged if you don't see your balance increasing right away! For more information please visit our Discord server."
            })) : "undefined" == r && $("#modalKeyInput").modal("show"), r.substr(0, 4)) {
            case "[chp":
                "0" == r.substr(6) ? Swal.fire({
                    title: "There was a problem",
                    text: "There was a problem with changing your active bonus. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Ok"
                }) : Swal.fire({
                    title: "Hurray!",
                    text: "You have successfully changed your active bonus to: " + r.substr(6).charAt(0).toUpperCase() + r.substr(6).slice(1) + "!",
                    icon: "success",
                    confirmButtonText: "Great!"
                });
                break;
            case "[cm]":
                0 == C && setTimeout(function() {
                    $("#StartLegacy").attr("hidden", !0), $("#stopLegacy").removeAttr("hidden"), $("statusDiv").attr("data-mdb-color", "success"), document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-success", document.getElementById("statusIcon").className = "fas fa-check-circle me-3", document.getElementById("status").innerHTML = "RUNNING", D = !1, C = !0, document.getElementById("stopLegacy").innerHTML = "Stop", $("#stopLegacy").removeAttr("disabled")
                }, 1e3);
                break;
            case "[ws]":
                d = $("#confirmWith"), Swal.fire({
                    title: "Success!",
                    text: "You have successfully requested your withdrawal!",
                    icon: "success",
                    confirmButtonText: "Nice!"
                }), d.removeAttr("disabled");
                var d = {
                    req: "pastWithdrawals"
                };
                d.user = A, window.api.send("toMain", d), $("#carousel").carousel(0), $("#carousel").carousel("pause");
                break;
            case "[ct]":
                0 != r.substr(5) ? location.reload() : (Swal.fire({
                    title: "There was a problem",
                    text: "There was a problem with changing your theme.",
                    icon: "error",
                    confirmButtonText: "Ok"
                }), $("#exampleFormControlSelect1").attr("disabled", !1));
                break;
            case "[wf]":
                d = $("#confirmWith"), Swal.fire({
                    title: "Oh No!",
                    text: r.substr(4),
                    icon: "error",
                    confirmButtonText: "Okay!"
                }), d.removeAttr("disabled");
                break;
            case "[id]":
                "1" == r.substr(5) ? (Swal.fire({
                    title: "Success!",
                    text: "Idle mode enabled!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }), $("#idlr").toggleClass("btn-success"), $("#idlr").toggleClass("btn-danger"), $("#idlr").html("Enabled")) : "0" == r.substr(5) ? (Swal.fire({
                    title: "Success!",
                    text: "Idle mode disabled!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }), $("#idlr").toggleClass("btn-success"), $("#idlr").toggleClass("btn-danger"), $("#idlr").html("Disabled")) : "4" == r.substr(5) ? ($("#idlr").html("Enabled"), $("#idlr").addClass("btn-success"), $("#idlr").removeClass("btn-danger")) : Swal.fire({
                    title: "Error",
                    text: "Unknown response",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }), $("#idlr").attr("disabled", !1);
                break;
            case "[bs]":
                "1" == r.substr(5) ? Swal.fire({
                    title: "Success!",
                    text: "Idle bandwidth enabled!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }) : "0" == r.substr(5) ? Swal.fire({
                    title: "Success!",
                    text: "Idle bandwidth disabled!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }) : "4" == r.substr(5) ? $("#bandwidthSwitch").trigger("click") : Swal.fire({
                    title: "Error",
                    text: "Unknown response",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                }), $("#bandwidthSwitch").attr("disabled", !1);
                break;
            case "[pw]":
                if ("0" != r.substr(5)) {
                    r = JSON.parse(r.substr(4));
                    var c = "<tr><td>",
                        u = "</td><td>";
                    let e = "Undetermined",
                        t = "amber",
                        a = "",
                        i = "",
                        n = ($("#withdrawTable tbody").empty(), $("#keystable tbody").empty(), 0);
                    for (n = 0; n < r.length; ++n)
                        if (isNaN(r[n].type)) i = c + r[n].title + u + r[n].value + "</td></tr>", $("#keystable").append(i);
                        else {
                            switch (r[n].status) {
                                case 0:
                                    e = "Pending", t = "info", a = "This withdrawal is currently pending...";
                                    break;
                                case 1:
                                    e = "Error", t = "danger", a = r[n].error;
                                    break;
                                case 2:
                                    e = "Success", t = "success", a = "This withdrawal has processed! Check your pending R$ on your ROBLOX account!";
                                    break;
                                default:
                                    e = "Alert", t = "danger", a = "There was an undetermined error with your withdrawal. Your points have been refunded."
                            }
                            i = c + '<span class="text-light">' + r[n].points + "</span>" + u + '<span class="badge text-light badge-' + t + '">' + e + "</span>" + u + '<span class="text-light"><a href="#" class="material-tooltip-main" id="" data-toggle="tooltip" title="' + a + '"><i class="far fa-question-circle text-white ml-1"></i></a></span></td></tr>', $("#withdrawTable").append(i)
                        } $(function() {
                        $('[data-toggle="tooltip"]').tooltip()
                    }), $(function() {
                        $(".material-tooltip-main").tooltip({
                            template: '<div class="tooltip md-tooltip-main"> <div class = "tooltip-arrow md-arrow" > </div> <div class = "tooltip-inner md-inner-main" > </div> </div>'
                        })
                    })
                }
                break;
            case "[sk]":
                l = r.substr(4), Swal.fire({
                    title: "Alert!",
                    text: JSON.parse(l).data.message,
                    icon: "info",
                    confirmButtonText: "OK!"
                });
                break;
            case "[we]":
                l = $("#confirmWith"), Swal.fire({
                    title: "Oh No!",
                    text: "There was an error with your withdrawal. Make sure to watch the video on how to withdraw, and if you still have problems join our discord and talk to our support team!",
                    icon: "error",
                    confirmButtonText: "Okay!"
                }), l.removeAttr("disabled");
                break;
            case "[ra]":
                r = r.substr(4), $("#recoverySubmit").removeAttr("disabled"), 1 == r && Swal.fire("Success!", "You have successfully recovered your account!", "success").then(e => {
                    location.reload()
                }), 0 == r && Swal.fire("Error", "An account with that key was not found!", "error");
                break;
            case "[gu]":
                "0" != r.substr(5) && (s = JSON.parse(r.substr(5)), null == I && (I = s), v = (I = s).points, L = s.name, A = s.pkey, parseInt(s.last_updated) < 60 ? ($("#giveawayStatus").html("Entered"), $("#entriesNumber").html("1"), $("#giveawayStatus").removeClass("text-danger"), $("#giveawayStatus").addClass("text-success")) : ($("#giveawayStatus").html("Not Entered"), $("#entriesNumber").html("0"), $("#giveawayStatus").removeClass("text-success"), $("#giveawayStatus").addClass("text-danger")), document.getElementById("estimationVal").innerHTML = String(s.estimation), document.getElementById("balanceVal").innerHTML = String(v), document.getElementById("userPTS").innerHTML = String(v), $("#refCode").html(String(s.id)), $("#refsNumber").html(String(s.referrals)), $("#referralRate").html(String(s.ref_rate) + "%"), $("#refEarningsNumber").html(String(s.ref_points)), $("#ketLoc").val(String(A)));
                break;
            case "[gl]":
                if ("0" != r.substr(5)) {
                    var m = JSON.parse(r.substr(5));
                    for (let e = 1; e <= 30; ++e) {
                        var g = "#imglvl" + String(e);
                        $(g).attr("src", m[e - 1].picture)
                    }
                    if (I.level !== 30) {
                        // Calculate the XP percentage towards the next level
                        let e = Math.floor(I.xp / m[I.level].xp_required * 100);
                        e = isNaN(e) ? 0 : e;
                        if (e > 100) e = 100;
                        if (I.level === 0) e = 100;
                        $("#lvlperc").html(e); $("#lvlperc2").html(e);
                        document.getElementById("levelVal").innerHTML = I.level;
                        var w = Math.min(Math.max(e, 5), 100);
                        $("#levelBar").css("width", String(w) + "%");
                        $("#levelBarLevelPage").css("width", String(w) + "%");
                        console.log(`Current Level: ${I.level}`);
                        console.log(`Current Level Badge: ./resources/badges/${I.level}.png`);
                        console.log(`Next Level Badge: ${I.level < 30 ? './resources/badges/' + (I.level + 1) + '.png' : './resources/badges/' + I.level + '.png'}`);
                        $("#progBarCurrLevelBadge").attr("src", `./resources/badges/${I.level}.png`);
                        $("#homepageLevelBadge").attr("src", `./resources/badges/${I.level}.png`);
                        if (I.level < 30) {
                            $("#progBarNextLevelBadge").attr("src", `./resources/badges/${I.level + 1}.png`);
                        } else {
                            $("#progBarNextLevelBadge").attr("src", `./resources/badges/${I.level}.png`);
                        }
                        $("#nextLevelRewardBadge").css("background-image", `url('./resources/badges/${I.level}.png')`);
                    }                    
                    let t = 1;
                    for (t; t <= I.level; ++t) {
                        var h = "lvl" + String(t);
                        document.getElementById(h).innerHTML = '<a><p><i class="fas fa-check"></i></p></a>'
                    }
                    w = "lvl" + String(t);
                    for ($("#nextLevelVal").html(String(I.level + 1)), $("#nextLevelRewardVal").html(String(m[t - 1].information)), document.getElementById(w).innerHTML = '<a><p><i class="fas fa-check"></i></p></a>', t; t <= 30; ++t)
                        if (I.xp >= m[t - 1].xp_required) {
                            var p = "lvl" + String(t);
                            document.getElementById(p).innerHTML = '<a id="claimLVL" value="' + String(t) + '"><p>Claim<i class="fas fa-exclamation"></i></p></a>'
                        } else {
                            var p = "lvl" + String(t),
                                b = m[t - 1].reward;
                            let e = "";
                            switch (b) {
                                case "Points":
                                    e = String(m[t - 1].information) + " R$ will be added to your account!";
                                    break;
                                case "PET":
                                    e = String(m[t - 1].reward_amount) + ": " + m[t - 1].information;
                                    break;
                                default:
                                    e = "New theme: " + b
                            }
                            var f = '<a href="#" class="material-tooltip-main" data-toggle="tooltip" title="' + e + '"><span class="text-light font-weight-bold" style="text-decoration: none">Level ' + String(t) + '<i class="far fa-question-circle text-white ml-2"></i></span></a>';
                            document.getElementById(p).innerHTML = f, $(function() {
                                $('[data-toggle="tooltip"]').tooltip()
                            })
                        }
                }
                break;
            case "[rc]":
                var v = $("#ClaimCode");
                (r = JSON.parse(r.substr(5))).error && Swal.fire({
                    title: "Oh No!",
                    text: "There was an error with redeeming your code!",
                    icon: "error",
                    confirmButtonText: "Okay!"
                }), r.status ? (Swal.fire({
                    title: "Success!",
                    text: "You have successfully redeemed the code for: " + r.data.message + "R$!",
                    icon: "success",
                    confirmButtonText: "Nice!"
                }), v.removeAttr("disabled"), O()) : (Swal.fire({
                    title: "Oh No!",
                    text: r.data.message,
                    icon: "error",
                    confirmButtonText: "Okay!"
                }), v.removeAttr("disabled"));
                break;
            case "[gi]":
                var y = (e, t) => {
                        e = document.getElementById(e);
                        e && (e.innerHTML = t)
                    },
                    S = JSON.parse(r.substr(5));
                if (S.Supported == []) {
                    var x = $("#refHardware");
                    document.getElementById("refHardware").innerHTML = "Error", x.attr("disabled", !1)
                } else {
                    let t = 0;
                    for (let e = 0; e < S.Supported.length; ++e) S.Supported[e] > t ? t = S.Supported[e] : t;
                    switch (t) {
                        case 0:
                            y("supBadge", '<div class="badge text-light badge-danger">Unsupported</div>');
                            break;
                        case 1:
                            y("supBadge", '<div class="badge text-light badge-warning">Supported</div>');
                            break;
                        case 2:
                        case 3:
                            y("supBadge", '<div class="badge text-light badge-success">Supported</div>');
                            break;
                        case 9:
                            y("supBadge", '<div class="badge text-light badge-warning">Supported</div>');
                            break;
                        default:
                            y("supBadge", '<div class="badge text-light badge-danger">Error</div>')
                    }
                    let a = "";
                    0 === S.gCardName.length && (a = "None Detected");
                    for (let e = 0; e < S.gCardName.length; ++e) a += " " + S.gCardName[e];
                    $("#gCard").attr("data-original-title", a), $("#gCard").text(a), $("#cCard").attr("data-original-title", S.cpuName), $("#cCard").text(S.cpuName);
                    x = $("#refHardware");
                    document.getElementById("refHardware").innerHTML = "Refresh", x.attr("disabled", !1)
                }
                break;
            case "[il]":
                s = $("#claimLVL"), "1" == r.substr(5) ? (Swal.fire({
                    title: "Success!",
                    text: "You have successfully leveled up and claimed your rewards!",
                    icon: "success",
                    confirmButtonText: "Awesome!"
                }), s.removeAttr("disabled"), O(), q()) : (Swal.fire({
                    title: "Error!",
                    text: "There was an error with increasing your level. Please try again later!",
                    icon: "error",
                    confirmButtonText: "Okay!"
                }), s.removeAttr("disabled"));
                break;
            case "[lh]":
                break;
            case "[gv]":
                var k = r.substr(4),
                    B = k.split(":")[0];
                let e = parseInt(k.split(":")[1]),
                    t = Math.floor(e / 60),
                    a = e - 60 * t;
                a = a < 10 ? "0" + a : a, $("#giveawayAMT").html(B), $("#giveawayTime").html(t + ":" + a);
                var T = setInterval(function() {
                    --e, t = Math.floor(e / 60), a = (a = e - 60 * t) < 10 ? "0" + a : a, $("#giveawayTime").html(t + ":" + a), e <= 0 && (clearInterval(T), $("#giveawayTime").html("ENDED"), N())
                }, 1e3);
                break;
            case "[mu]":
                "def" == r.substr(5) ? ($("#prioDef").toggleClass("btn-success text-white"), $("#prioAlt").toggleClass("btn-success text-white"), $("#prioAlt").prop("disabled", !1), $("#prioDef").prop("disabled", !0)) : "alt" == r.substr(5) && ($("#prioAlt").toggleClass("btn-success text-white"), $("#prioDef").toggleClass("btn-success text-white"), $("#prioDef").prop("disabled", !1), $("#prioAlt").prop("disabled", !0)), Swal.fire({
                    title: "Success!",
                    text: "You have successfully changed your miner! If you notice a decrease in earnings, you can always switch back!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Continue"
                });
                break;
            case "[sp]":
                r = JSON.parse(r.substr(4));
                let i = '<div id="LvlsBG" class="card-header text-center bg-secondary py-3 pt-0 mb-2">\n                    <p class="h5-responsive text-white font-weight-bold mb-0">Featured Rewards</p>\n                                    </div>\n<section class="text-white w-responsive mx-auto text-center" style="font-size: .88em;">\n                                            <p class="mb-0"></p>\n                                            <p class="mb-1">From Gift Cards to in-game currencies, here you can find all kinds of ways to redeem your earnings! These rewards change periodically, with new rewards coming and old ones leaving, so make sure to check back here frequently!</p>\n                                            </section><hr style="border:1px solid whitesmoke;"><div class="row mx-2 mb-3">',
                    n = 0;
                for (let a = 0; a < r.length + 1; ++a) {
                    if (4 < n && (i += '</div><div class="row mx-2 mb-3">', n = 0), a == r.length) i += '                            <div class="col"><div class="card card-ecommerce" style="background-color: transparent">\n                                <div class="view overlay" style="height:150px;background-repeat: no-repeat; background-position: bottom; background-size: cover; background-image:url(\'https://rbxidle.com/pets/chest_reward.jpg\')">\n                                </div>\n                                <div class="card-body text-center">\n                                    <p class="card-title mb-3 text-white font-weight-bold">Coming Soon!</p>\n                                    <div class="card-footer pb-0">\n                                        <div class="mb-0 text-white">\n                                            <span class="text-success">R$</span>???\n                                            <br>\n                                        </div>\n                                        <a class="btn btn-rounded btn-outline-success disabled" data-dismiss="modal" disabled>???</a>\n\n                                    </div>\n                                </div>\n                            </div></div>\n';
                    else {
                        let e, t = "";
                        "Out of stock" == (e = 0 < r[a].stock ? "Redeem" : "Out of stock") && (t = "disabled"), i += '                            <div class="col"><div class="card card-ecommerce" style="background-color: transparent">\n                                <div class="view overlay">\n                                    <img src="' + r[a].picture + '" class="img-fluid">\n                                    <a>\n                                        <div class="mask rgba-white-slight"></div>\n                                    </a>\n                                </div>\n                                <div class="card-body text-center">\n                                    <p class="card-title mb-3 text-white font-weight-bold">' + r[a].name + '</p>\n                                    <div class="card-footer pb-0">\n                                        <div class="mb-0 text-white">\n                                            <span class="text-success">R$</span>' + r[a].price + '\n                                            <br>\n                                        </div>\n                                        <a id="redSpot' + r[a].id + '" class="btn btn-rounded btn-outline-success btn-spot-red ' + t + '" data-dismiss="modal" >' + e + "</a>\n\n                                    </div>\n                                </div>\n                            </div></div>\n"
                    }
                    n += 1
                }
                i += "</div>", document.getElementById("featuredModalBody").innerHTML = i;
                break;
            case "chan":
                Swal.fire({
                    title: "Success!",
                    text: "You have successfully changed your region!",
                    icon: "success",
                    confirmButtonText: "Nice!"
                }), $("input[name=regionBtn]").attr("disabled", !1)
        }
    }), window.api.receive("fromMainUpdater", e => {
        var t;
        "[pp]" == e.substr(0, 4) ? ($("#StartMining"), document.getElementById("StartMining").innerHTML = "Downloading: " + e.substr(5) + "%") : "[fe]" == e.substr(0, 4) ? (t = $("#StartMining"), document.getElementById("StartMining").innerHTML = "Start", t.attr("disabled", !1)) : "[mm]" == e ? console.log("attempting miner repair") : "avail" == e ? Swal.fire({
            title: "Success!",
            text: "An update is available, and will be downloaded!",
            icon: "success",
            confirmButtonText: "Nice!"
        }) : "down" == e ? Swal.fire({
            title: "Success!",
            text: "An update has been downloaded, it will now proceed to install!",
            icon: "success",
            confirmButtonText: "Nice!"
        }) : "prog" === e.substr(0, 4) && ($("#upModal").modal("show"), e = e.substr(4), $("#downProg").html(e))
    }), $("#version").html(initVals.version), initVals.idle && $("#idlr").trigger("click"), initVals.bandwidth && (console.log("bandwidth on"), $("#bandwidthSwitch").trigger("click"));
    let L = "",
        A = initVals.pkey,
        D = !0,
        d = new Image;

    function a(e, t, a, i) {
        n.drawImage(d, e * r, t * o, r, o, a, i, s, l)
    }
    d.src = "./resources/miner.png", d.onload = function() {
        window.requestAnimationFrame(g)
    }, "0" == initVals.lh && ($("#lhrSwitch").toggleClass("btn-success"), $("#lhrSwitch").toggleClass("btn-danger"), $("#lhrSwitch").html("Disabled")), initVals.cpuEnabled && $("#cpuSwitch").trigger("click"), initVals.gpuEnabled && $("#gpuSwitch").trigger("click"), $("#cpuSwitch").on("change", e => {
        $("#cpuSwitch").attr("disabled", !0);
        var t = {
            req: "enableHW",
            hw: "cpu"
        };
        t.val = e.target.checked, window.api.send("toMain", t), setTimeout(() => {
            $("#cpuSwitch").attr("disabled", !1)
        }, 1e3)
    }), $("#gpuSwitch").on("change", e => {
        $("#gpuSwitch").attr("disabled", !0);
        var t = {
            req: "enableHW",
            hw: "gpu"
        };
        t.val = e.target.checked, window.api.send("toMain", t), setTimeout(() => {
            $("#gpuSwitch").attr("disabled", !1)
        }, 1e3)
    }), $("#bandwidthSwitch").on("change", e => {
        $("#bandwidthSwitch").attr("disabled", !0);
        var t = {
            req: "[bs]"
        };
        window.api.send("toMain", t)
    }), $("#lhrSwitch").on("click", () => {
        $("#lhrSwitch").attr("disabled", !0), Swal.fire({
            title: "Are you sure?",
            text: "Disabling this will likely lower the earnings you receive, however depending on your setup it may allow you to mine if you are experiencing issues, or in rare cases it may slightly increase your earnings.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(e => {
            e.isConfirmed && (e = {
                req: "[lh]"
            }, window.api.send("toMain", e))
        })
    }), $("#debugStatus").on("click", () => {
        $("#debugStatus").attr("disabled", !0), setTimeout(() => {
            $("#debugStatus").attr("disabled", !1)
        }, 1e4)
    }), $("#showlevelstab").on("click", () => {
        $('#navigationTabs a[href="#panel13"]').tab("show")
    }), $("#debugStart").on("click", () => {
        var e = {
            req: "[gd]"
        };
        console.log("debug start");
        let t = $("#debugStart");
        t.attr("disabled", !0), window.api.send("toMain", e), setTimeout(() => {
            t.attr("disabled", !1)
        }, 1e4)
    }), $("#petModal").on("click", ".changepet", e => {
        var t = {
            req: "[chp]"
        };
        t.pet = String(e.target.getAttribute("id")).substr(8), t.user = A, console.log("cc"), window.api.send("toMain", t)
    }), $("#featuredModalBody").on("click", ".btn-spot-red", e => {
        e.target.disabled = !0;
        var t = {};
        t.user = A, t.name = String(e.target.getAttribute("id")).substr(7), t.req = "redeemSpotlight", window.api.send("toMain", t), setTimeout(function() {
            e.target.disabled = !1
        }, 5e3)
    }), $("#idlr").on("click", () => {
        $("#idlr").attr("disabled", !0);
        var e = {
            req: "[id]"
        };
        window.api.send("toMain", e)
    }), $("#giveawayStatusDiv").on("click", () => {
        console.log("clicked"), $("#codesClick").trigger("click")
    });
    const i = [0, 1, 2, 3, 4];
    let c = 0,
        u = 0,
        m = 11;

    function g() {
        M ? (u = 0, n.clearRect(0, 0, e.width, e.height), a(i[c], m, 0, 0), ++c >= i.length && (c = 0, 26 <= m ? m = 0 : m++)) : (u = 0, n.clearRect(0, 0, e.width, e.height), a(i[c], 9, 0, 0), ++c >= i.length && (c = 0)), setTimeout(() => {
            window.requestAnimationFrame(g)
        }, 83)
    }
    $("#show_hide_password a").on("click", function(e) {
        e.preventDefault(), "text" == $("#show_hide_password input").attr("type") ? ($("#show_hide_password input").attr("type", "password"), $("#show_hide_password i").addClass("fa-eye-slash"), $("#show_hide_password i").removeClass("fa-eye")) : "password" == $("#show_hide_password input").attr("type") && ($("#show_hide_password input").attr("type", "text"), $("#show_hide_password i").removeClass("fa-eye-slash"), $("#show_hide_password i").addClass("fa-eye"))
    }), $("input[type=radio][name=intensityBtn]").change(function() {
        var e = this.value;
        $("input[name=intensityBtn]").attr("disabled", !0), $.ajax({
            url: "/intensity",
            method: "POST",
            data: {
                intensity: e
            },
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            success: function(e) {
                e.status ? Swal.fire({
                    icon: "success",
                    title: "Nice!",
                    text: "Successfully changed intensity!"
                }) : Swal.fire({
                    icon: "error",
                    title: "Oh No!",
                    text: "There was a problem with changing the intensity!"
                }), $("input[name=intensityBtn]").attr("disabled", !1)
            },
            error: function(e) {
                e.responseJSON;
                Swal.fire({
                    icon: "error",
                    title: "Oh No!",
                    text: "There was a problem with changing the intensity!"
                }), $("input[name=intensityBtn]").attr("disabled", !1)
            }
        })
    }), $("#exampleFormControlSelect1").change(function() {
        $("#exampleFormControlSelect1").attr("disabled", !0);
        var e = {
            req: "[ct]"
        };
        e.theme = $(this).val(), e.user = A, window.api.send("toMain", e)
    }), N(), $("input[type=range][name=tlim]").change(function() {
        let t = this.value;
        $("input[name=tlim]").attr("disabled", !0), Swal.fire({
            title: "Are you sure?",
            text: "This will allow you to override your GPU in order to set a lower or higher temperature limit. IF YOU DO NOT KNOW WHAT YOU ARE DOING, DO NOT MESS WITH THIS SETTING! Your graphics card contains internal temperature limiters and will automatically throttle itself if temperatures get too high, without the use of this setting. Setting this value manually too high may affect the lifespan of your GPU, and setting it too low will drastically lower your R$ earnings.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(e => {
            e.isConfirmed ? $.ajax({
                url: "/temp",
                method: "POST",
                data: {
                    temp: t
                },
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                success: function(e) {
                    e.status ? Swal.fire({
                        icon: "success",
                        title: "Nice!",
                        text: "Successfully changed max GPU temperature!"
                    }) : Swal.fire({
                        icon: "error",
                        title: "Oh No!",
                        text: "There was a problem with changing the max GPU temperature!"
                    }), $("input[name=tlim]").attr("disabled", !1)
                },
                error: function(e) {
                    e.responseJSON;
                    Swal.fire({
                        icon: "error",
                        title: "Oh No!",
                        text: "There was a problem with changing the max GPU temperature."
                    }), $("input[name=tlim]").attr("disabled", !1)
                }
            }) : ($("input[name=tlim]").attr("disabled", !1), $("input[name=tlim]").attr("value", t), document.getElementById("tempspan").innerHTML = t)
        })
    }), $("input[type=range][name=customRange3]").change(function() {
        let t = this.value;
        $("input[name=customRange3]").attr("disabled", !0), Swal.fire({
            title: "Are you sure?",
            text: "Disabling this will likely lower the earnings you receive, however depending on your setup it may allow you to mine if you are experiencing issues, or in rare cases it may slightly increase your earnings.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(e => {
            e.isConfirmed ? (e = {
                req: "[lh]"
            }, window.api.send("toMain", e)) : ($("input[name=customRange3]").attr("disabled", !1), $("input[name=customRange3]").attr("value", t), document.getElementById("tempspan").innerHTML = t)
        })
    });
    const w = $(".valueSpan"),
        h = $("#slider11");
    switch (w.html(h.val()), h.on("input change", () => {
            w.html(h.val())
        }), initVals.region) {
        case 1:
            $("#reg-us").attr("checked", !0);
            break;
        case 2:
            $("#reg-eur").attr("checked", !0);
            break;
        case 3:
            $("#reg-asia").attr("checked", !0)
    }

    function p() {
        var e = {
            req: "getSpot"
        };
        window.api.send("toMain", e)
    }
    $("input[type=radio][name=regionBtn]").change(function() {
        var e = this.value,
            t = ($("input[name=regionBtn]").attr("disabled", !0), {});
        t.req = "regionChange", t.region = e, window.api.send("toMain", t)
    }), $("#closeReq").on("click", () => {
        var e = {
            req: "closeApp"
        };
        window.api.send("toMain", e)
    }), $("#giveawaysTitle").on("click", () => {
        $("#giveawayFeatureModal").modal("show")
    }), p();
    setInterval(() => {
        p()
    }, 305e3);

    function O() {
        var e = {
            req: "[gu]"
        };
        window.api.send("toMain", e)
    }

    function q() {
        var e;
        null == I ? e = window.setInterval(() => {
            null != I && (window.api.send("toMain", {
                req: "[gl]"
            }), clearInterval(e))
        }, 1e3) : window.api.send("toMain", {
            req: "[gl]"
        })
    }
    $("#minReq").on("click", () => {
        var e = {
            req: "minimizeApp"
        };
        window.api.send("toMain", e)
    }), $("#StartMining").on("click", () => {
        var e = $("#StartMining"),
            e = (document.getElementById("StartMining").innerHTML = "Starting...", e.attr("disabled", !0), document.getElementById("StartMining").innerHTML = "Loading...", {});
        e.req = "startMining", e.intensity = 100, e.username = L, e.region = 1, window.api.send("toMain", e)
    }), $("#StartLegacy").on("click", () => {
        let t = $("#StartLegacy");
        t.attr("disabled", !0), Swal.fire({
            title: "Are you sure?",
            text: "CPU mining is only recommended if you don't have a supported GPU. This version of mining is significantly less efficient than GPU mining.",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(e => {
            e.isConfirmed && (document.getElementById("StartLegacy").innerHTML = "Starting...", (e = {
                req: "cpuMining",
                intensity: 100
            }).username = L, e.region = 1, window.api.send("toMain", e)), t.removeAttr("disabled")
        })
    }), $("#recoverySubmit").on("click", () => {
        let t = $("#recoverySubmit");
        t.attr("disabled", !0), Swal.fire({
            title: "Are you sure?",
            text: "Inputting a recovery key means you will be logged out of this current account. If you wish to continue logging into the account associated with this recovery key, click continue",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(e => {
            e.isConfirmed ? ((e = {}).key = $("#revoceryKeyI").val(), e.req = "[ra]", window.api.send("toMain", e)) : t.attr("disabled", !1)
        })
    }), $("#recoverySubmit2").on("click", () => {
        $("#recoverySubmit2").attr("disabled", !0);
        var e = {};
        e.key = $("#revoceryKeyI2").val(), e.req = "[ra]", window.api.send("toMain", e)
    }), $("#referralSubmit").on("click", () => {
        $("#referralSubmit").attr("disabled", !0);
        var e = {};
        e.code = $("#referralCodeVal").val(), e.req = "[ref]", window.api.send("toMain", e), setTimeout(() => {
            $("#welcomeRefModal").modal("hide"), console.log("closed ref")
        }, 1e3)
    }), $("#Anaiyv").on("click", () => {
        $("#Anaiyv").attr("disabled", !0);
        var e = {};
        e.req = "gn", window.api.send("toMain", e)
    }), q(), setInterval(q, 3e6), $("#stopBTN").on("click", () => {
        var e = $("#stopBTN");
        document.getElementById("stopBTN").innerHTML = "Stopping...", e.attr("disabled", !0), window.api.send("toMain", {
            req: "stopMining"
        })
    }), $("#prioAlt").on("click", () => {
        $("#prioAlt").attr("disabled", !0), $("#prioDef").attr("disabled", !0), window.api.send("toMain", {
            req: "[cm]",
            newValue: "alt"
        })
    }), $("#prioDef").on("click", () => {
        $("#prioAlt").attr("disabled", !0), $("#prioDef").attr("disabled", !0), window.api.send("toMain", {
            req: "[cm]",
            newValue: "def"
        })
    });
    var b = $("#refHardware");
    document.getElementById("refHardware").innerHTML = "Refreshing...", b.attr("disabled", !0), window.api.send("toMain", {
        req: "[gf]"
    }), $("#refHardware").on("click", () => {
        var e = $("#refHardware");
        document.getElementById("refHardware").innerHTML = "Refreshing...", e.attr("disabled", !0), window.api.send("toMain", {
            req: "[gi]"
        })
    }), $("#stopLegacy").on("click", () => {
        var e = $("#stopLegacy"),
            e = (document.getElementById("stopLegacy").innerHTML = "Stopping...", e.attr("disabled", !0), {});
        e.req = "stopCPU", window.api.send("toMain", e)
    }), window.setInterval(O, 3e4);
    $("#confirmPoints").on("click", () => {
        var e = $("#confirmPoints");
        e.attr("disabled", !0), $("#withAmount").val() < 10 ? (Swal.fire({
            title: "Error!",
            text: "The minimum withdrawal amount is 10!",
            icon: "error",
            confirmButtonText: "Okay!"
        }), e.removeAttr("disabled")) : $("#withAmount").val() % 1 != 0 ? (Swal.fire({
            title: "Error!",
            text: "You must withdraw a whole number!",
            icon: "error",
            confirmButtonText: "Okay!"
        }), e.removeAttr("disabled")) : ($("#rblxRedeem").modal("hide"), $("#rblxConfirm").modal("show"), e.removeAttr("disabled"), $("#withAm").html($("#withAmount").val()), $("#servAm").html($("#withAmount").val()))
    }), $("#chooseBobux").on("click", () => {
        $("#rblxRedeem").modal({
            show: !0
        })
    }), $("#getRegKey").on("click", () => {
        $("#getRegKey").attr("disabled", !0);
        var e = {};
        e.user = A, e.req = "redeemReg", window.api.send("toMain", e)
    }), $("#getPremKey").on("click", () => {
        $("#getPremKey").attr("disabled", !0);
        var e = {};
        e.user = A, e.req = "redeemPrem", window.api.send("toMain", e)
    }), $("#getNitro").on("click", () => {
        $("#getNitro").attr("disabled", !0);
        var e = {};
        e.user = A, e.req = "redeemNitro", window.api.send("toMain", e)
    }), $("#getNitroPrem").on("click", () => {
        $("#getNitroPrem").attr("disabled", !0);
        var e = {};
        e.user = A, e.req = "redeemNitroPrem", window.api.send("toMain", e)
    }), $("#back").on("click", () => {
        $("#rblxConfirm").modal("hide")
    }), $("#back2").on("click", () => {
        $("#rblxRedeem").modal("hide")
    }), $(document.body).on("click", "#claimLVL", function() {
        $("#claimLVL").attr("disabled", !0);
        var e = {};
        e.level = 1, e.req = "[il]", window.api.send("toMain", e)
    }), $("#ClaimCode").on("click", () => {
        $("#ClaimCode").attr("disabled", !0);
        var e = {};
        e.code = $("#Code").val(), e.req = "[rc]", window.api.send("toMain", e)
    }), $("#confirmWith").on("click", () => {
        $("#confirmWith").attr("disabled", !0);
        var e = {};
        e.user = A, e.req = "withdraw", e.points = $("#withAmount").val(), e.gameID = $("#gameID").val(), window.api.send("toMain", e)
    }), $("#discordSub").on("click", () => {
        var e = $("#discordSub"),
            t = (e.attr("disabled", !0), {});
        t.req = "[glk]", t.link = "https://discord.gg/Rbxidle", window.api.send("toMain", t), e.removeAttr("disabled")
    })
}), $(function() {
    $('[data-toggle="tooltip"]').tooltip()
}), $(function() {
    $(".material-tooltip-main").tooltip({
        template: '<div class="tooltip md-tooltip-main"> <div class = "tooltip-arrow md-arrow" > </div> <div class = "tooltip-inner md-inner-main" > </div> </div>'
    })
});