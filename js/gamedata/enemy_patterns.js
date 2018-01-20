var enemyPatterns = {
"basic": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.6"},{"next":"node4","weight":"0.4"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]],"animFPS":2},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}}]},
"basicFarm": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.95"},{"next":"node4","weight":"0.05"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}}]},
"basicRock": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.4"},{"next":"node4","weight":"0.2"},{"next":"node7","weight":"0.4"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node8","data":{"textID":"throwRockFail","message":"IDLE","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node7","data":{"textID":"throwRockSucc","message":"TRY_THROW_ROCK","animData":[[0,2],[0,2],[0,3],[0,0,true]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node8","condition":"ELSE"}]}}]},
"bear": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node6","weight":"0.4"},{"next":"node3","weight":"0.4"},{"next":"node4","weight":"0.2"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node7","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"message":"RANDOM_GT","action":"0.75"},"next":{"type":"conditional","data":[{"next":"node8","condition":"SUCCESS"},{"next":"node9","condition":"ELSE"}]}},{"id":"node7","data":{},"next":{"type":"conditional","data":[{"next":"node6","weight":"0.3"},{"next":"node4","weight":"0.7"}],"condition":"random"}},{"id":"node8","data":{"textID":"fishSuccess","message":"HEAL_RANGE","action":"10,8","animData":[[0,4],[0,5]],"animFPS":12}},{"id":"node9","data":{"textID":"fishFail","message":"WRITE_TEXT","animData":[[0,4],[0,5]],"animFPS":12}}]},
"beepBeep": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.65"},{"next":"node7","weight":"0.2"},{"next":"node6","weight":"0.1"},{"next":"node4","weight":"0.05"}],"condition":"random"}},{"id":"node3","data":{"textID":"carPlantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"revEngine","message":"REV_ENGINE","animData":[[0,4],[0,5]],"animFPS":12}},{"id":"node7","data":{"textID":"tireChuck","message":"TIRE_CHUCK","animData":[[0,4],[0,5]],"animFPS":12},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}}]},
"boss1": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node6","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.6"},{"next":"node4","weight":"0.2"},{"next":"node7","weight":"0.2"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"battery","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node7","data":{"textID":"modulateAttack","message":"MODULATE","action":"args","animData":[[0,4],[0,5]],"animFPS":3}},{"id":"node6","data":{},"next":{"type":"conditional","data":[{"next":"node1","weight":"0.6"},{"next":"node4","weight":"0.2"},{"next":"node7","weight":"0.2"}],"condition":"random"}}]},
"boss2": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node8","condition":"HAS_BABIES_READY"},{"next":"node6","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.6"},{"next":"node4","weight":"0.2"},{"next":"node7","weight":"0.2"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node7","data":{"textID":"modulateAttack","message":"MODULATE","action":"0,1,2,3","animData":[[0,4],[0,5]]}},{"id":"node6","data":{},"next":{"type":"conditional","data":[{"next":"node1","weight":"0.6"},{"next":"node4","weight":"0.2"},{"next":"node7","weight":"0.2"}],"condition":"random"}},{"id":"node8","data":{"textID":"babyToss","message":"THROW_BABY","animData":[[0,4],[0,5]]}}]},
"constrboss": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.4"},{"next":"node4","weight":"0.1"},{"next":"node6","weight":"0.1"},{"next":"node7","weight":"0.4"}],"condition":"random"}},{"id":"node3","data":{"textID":"fileBPermit","message":"TRY_PLANT_CROP","action":"bpermit","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"buildHouse","message":"TRY_PLANT_CROP","action":"house","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node3","condition":"ELSE"}]}},{"id":"node8","data":{"textID":"throwRockFail","message":"IDLE","animData":[[0,2],[0,2],[0,3],[0,0,true]],"animFPS":12}},{"id":"node7","data":{"textID":"throwRockSucc","message":"TRY_THROW_ROCK","animData":[[0,2],[0,2],[0,3],[0,0,true]],"animFPS":12},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node8","condition":"ELSE"}]}}]},
"construction": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.6"},{"next":"node4","weight":"0.3"},{"next":"node6","weight":"0.1"}],"condition":"random"}},{"id":"node3","data":{"textID":"fileBPermit","message":"TRY_PLANT_CROP","action":"bpermit","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"buildHouse","message":"TRY_PLANT_CROP","action":"house","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node3","condition":"ELSE"}]}}]},
"housekeeper": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node6","condition":"UNPLUGGED"},{"next":"node3","condition":"ELSE"}]}},{"id":"node3","data":{"textID":"eh","message":"HOUSEKEEPER","animData":[[0,2],[0,3],[0,4],[0,5,true]],"animFPS":6}},{"id":"node6","data":{"message":"SKIP"}}]},
"lawnmower": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node16","condition":"PLAYER_HAS_CROPS"},{"next":"node10","condition":"ELSE"}]}},{"id":"node10","data":{},"next":{"type":"conditional","data":[{"next":"node13","weight":"0.4"},{"next":"node14","weight":"0.6"}],"condition":"random"}},{"id":"node11","data":{"textID":"cropAttack","message":"ATTACK_CROP","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node15","condition":"SUCCESS"},{"next":"node14","condition":"ELSE"}]}},{"id":"node14","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node13","data":{"textID":"throwRockSucc","message":"TRY_THROW_ROCK","animData":[[0,2],[0,2],[0,3],[0,0,true]]},"next":{"type":"conditional","data":[{"next":"node15","condition":"SUCCESS"},{"next":"node14","condition":"ELSE"}]}},{"id":"node15","data":{"message":"END"}},{"id":"node16","data":{},"next":{"type":"conditional","data":[{"next":"node11","weight":"0.55"},{"next":"node13","weight":"0.45"}],"condition":"random"}}]},
"mobster": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node16","condition":"PLAYER_HAS_CROPS"},{"next":"node21","condition":"ELSE"}]}},{"id":"node10","data":{},"next":{"type":"conditional","data":[{"next":"node13","weight":"0.8"},{"next":"node14","weight":"0.2"}],"condition":"random"}},{"id":"node11","data":{"textID":"cropAttack","message":"ATTACK_CROP","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node18","condition":"SUCCESS"},{"next":"node21","condition":"ELSE"}]}},{"id":"node14","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node13","data":{"textID":"plantAttack","message":"TRY_PLANT_THREE_CROPS","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node18","condition":"SUCCESS"},{"next":"node14","condition":"ELSE"}]}},{"id":"node16","data":{},"next":{"type":"conditional","data":[{"next":"node11","weight":"0.4"},{"next":"node21","weight":"0.6"}],"condition":"random"}},{"id":"node21","data":{},"next":{"type":"conditional","data":[{"next":"node17","condition":"HAS_CROPS_READY"},{"next":"node10","condition":"ELSE"}]}},{"id":"node17","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node18","data":{"message":"END"}}]},
"mrGrillerGrillSpirits": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.8"},{"next":"node6","weight":"0.1"},{"next":"node4","weight":"0.1"}],"condition":"random"}},{"id":"node3","data":{"textID":"grillAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]],"animFPS":12},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node6","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"kombuch","message":"MAYBE_TRY_DRINK_KOMBUCHA","animData":[[0,4],[0,5]],"animFPS":12},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}}]},
"nernd": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node6","condition":"HAS_CROPS_READY"},{"next":"node8","condition":"WHOPPY_MACHINE_BROKE"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.4"},{"next":"node12","weight":"0.4"},{"next":"node13","weight":"0.2"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP_NERD","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node14","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{},"next":{"type":"conditional","data":[{"next":"node7","weight":"0.4"},{"next":"node1","weight":"0.6"}],"condition":"random"}},{"id":"node7","data":{"textID":"cropAttack","message":"LAUNCH_CROPS_AT_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node1","condition":"ELSE"}]}},{"id":"node8","data":{},"next":{"type":"conditional","data":[{"next":"node9","weight":"0.55"},{"next":"node2","weight":"0.45"}],"condition":"random"}},{"id":"node9","data":{"textID":"repairMachine","message":"REPAIR_MACHINE","animData":[[0,4],[0,5]],"animFPS":12}},{"id":"node13","data":{"textID":"sipSomeFood2","message":"HEAL_RANGE","action":"30,60","animData":[[0,4],[0,5]]}},{"id":"node12","data":{},"next":{"type":"conditional","data":[{"next":"node4","weight":"0.6"},{"next":"node15","weight":"0.4"}],"condition":"random"}},{"id":"node14","data":{},"next":{"type":"conditional","data":[{"next":"node12","condition":"0.6"},{"next":"node13","condition":"0.4"}]}},{"id":"node15","data":{"textID":"standardAttack","message":"ATTACK_CROP","animData":[[0,2],[0,2],[0,3],[0,0,true]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}}]},
"outlet": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node6","condition":"UNPLUGGED"},{"next":"node3","condition":"ELSE"}]}},{"id":"node3","data":{"message":"SKIP"}},{"id":"node6","data":{"textID":"plugAttempt","message":"TRY_PLUG","animData":[[0,2],[0,3]],"animFPS":4}}]},
"pigGun": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node8","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.39"},{"next":"node4","weight":"0.29"},{"next":"node6","weight":"0.39"},{"next":"node7","weight":"0.03"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"splashSucc","message":"SPLASH_TILE","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node7","data":{"textID":"pigWithAFuckingGun","message":"PIG_GUN","animData":[[0,4],[0,5]],"animFPS":4}},{"id":"node8","data":{},"next":{"type":"conditional","data":[{"next":"node1","weight":"0.6"},{"next":"node2","weight":"0.4"}],"condition":"random"}}]},
"router": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node7","condition":"UNPLUGGED"},{"next":"node1","condition":"HAS_CLOUD"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"cloudShare","message":"BOOST_CLOUD","animData":[[0,4],[0,5]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.3"},{"next":"node4","weight":"0.7"}],"condition":"random"}},{"id":"node3","data":{"textID":"cloudSucc","message":"TRY_PLANT_CROP","action":"cloud","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node6","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"routerIdle","message":"IDLE","animData":[[0,4],[0,5]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"cloudFail","message":"IDLE","animData":[[0,4],[0,5]]}},{"id":"node7","data":{"message":"SKIP"}}]},
"server": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node6","condition":"UNPLUGGED"},{"next":"node3","condition":"ELSE"}]}},{"id":"node5","data":{"message":"END"}},{"id":"node3","data":{"textID":"initializeAttack","message":"TRY_PLANT_CROP","action":"lightbulb,download,battery,app,printer,headphones,drone","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"clearCache","message":"CLEAR_CACHE","animData":[[0,4],[0,5]]}},{"id":"node6","data":{"message":"SKIP"}}]},
"slap": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":"node4"},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}}]},
"tutorial": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":"node1"},{"id":"node1","data":{"message":"CONVINCEATRON"}}]},
"vendo": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.8"},{"next":"node4","weight":"0.2"}],"condition":"random"}},{"id":"node3","data":{"textID":"vendoAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}}]},
"wacg": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":"node3"},{"id":"node3","data":{"textID":"eh","message":"CARDGAME","animData":[[0,0],[0,1,true]]}}]},
"wetboy": {"nodes":[{"id":"node0","data":{"message":"INIT"},"next":{"type":"conditional","data":[{"next":"node1","condition":"HAS_CROPS_READY"},{"next":"node2","condition":"ELSE"}]}},{"id":"node1","data":{"textID":"standardAttack","message":"LAUNCH_CROPS","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node2","data":{},"next":{"type":"conditional","data":[{"next":"node3","weight":"0.4"},{"next":"node4","weight":"0.3"},{"next":"node6","weight":"0.4"}],"condition":"random"}},{"id":"node3","data":{"textID":"plantAttack","message":"TRY_PLANT_CROP","action":"args","animData":[[0,4],[0,5]]},"next":{"type":"conditional","data":[{"next":"node5","condition":"SUCCESS"},{"next":"node4","condition":"ELSE"}]}},{"id":"node4","data":{"textID":"standardAttack","message":"WEAK_ATTACK","animData":[[0,2],[0,2],[0,3],[0,0,true]]}},{"id":"node5","data":{"message":"END"}},{"id":"node6","data":{"textID":"splashSucc","message":"SPLASH_TILE","animData":[[0,2],[0,2],[0,3],[0,0,true]],"animFPS":12}}]}
};