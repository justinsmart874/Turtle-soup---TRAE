export type StoryDifficulty = 'easy' | 'medium' | 'hard';

export interface Story {
  id: string;
  title: string;
  difficulty: StoryDifficulty;
  surface: string;
  bottom: string;
}

export const stories: Story[] = [
  {
    id: 'story-rainbow-umbrella',
    title: '彩虹伞失踪案',
    difficulty: 'easy',
    surface:
      '放学后，小米发现教室门口少了一把彩虹伞。第二天，伞又自己“回来了”，还更干净了。',
    bottom:
      '值日老师看到伞上有泥点，担心小朋友第二天会弄脏校服，就先带回办公室擦干净。第二天早上又放回原位，所以看起来像“失踪后自己回来”。',
  },
  {
    id: 'story-midnight-cake',
    title: '半夜会变小的蛋糕',
    difficulty: 'easy',
    surface:
      '乐乐把生日蛋糕放进冰箱，第二天早上蛋糕明显小了一圈，但家里没人承认偷吃。',
    bottom:
      '妈妈把蛋糕切出一块送给隔壁独居奶奶尝尝，又重新整理摆盘，家人以为“没人动过”，其实是做了暖心分享。',
  },
  {
    id: 'story-silent-piano',
    title: '听不见的钢琴演奏',
    difficulty: 'medium',
    surface:
      '晚上八点，楼下说听到钢琴声；可同一时间，楼上的小宇说他在弹“静音钢琴”，按理别人不该听见。',
    bottom:
      '小宇确实在用静音模式练琴，别人听到的是他妹妹在客厅用平板播放的钢琴教学视频。两个声音来源被误认为是同一件事。',
  },
  {
    id: 'story-library-lamp',
    title: '图书馆会亮的空桌子',
    difficulty: 'medium',
    surface:
      '周末图书馆快闭馆时，一张没有人的桌子台灯突然亮了，管理员还说“他又来了”。',
    bottom:
      '那盏灯是感应式台灯，附近有人经过就会亮。管理员说的“他”是每天来还书、总在这个时段路过的小男孩，不是神秘事件。',
  },
  {
    id: 'story-three-clues-box',
    title: '三条线索的空盒子',
    difficulty: 'hard',
    surface:
      '小队在寻宝游戏中找到一个“空盒子”，盒里只有一张纸写着：蓝色、圆形、会走路。最后他们真的找到了“宝藏”。',
    bottom:
      '“蓝色、圆形、会走路”指的是穿蓝色圆点雨衣、正在巡逻的校工叔叔。真正宝藏是他手上的奖章贴纸包，寻宝规则就是根据描述找到“人”。',
  },
  {
    id: 'story-morning-drawer',
    title: '早上会变满的抽屉',
    difficulty: 'easy',
    surface:
      '小明每天睡前把铅笔盒放进抽屉，第二天早上打开抽屉时，里面总是多出几支新铅笔。',
    bottom:
      '是小明的妈妈每天晚上检查他的学习用品，发现铅笔快用完了就悄悄补充新的，所以抽屉每天早上都像“变魔术”一样多出铅笔。',
  },
  {
    id: 'story-park-bench',
    title: '公园长椅的秘密',
    difficulty: 'easy',
    surface:
      '每天下午三点，公园的长椅上都会出现一个红色的小布包，但到了晚上就不见了。',
    bottom:
      '是附近小学的一位同学每天带午餐到公园吃，吃完后把布包放在长椅上，下午放学时再回来拿走，所以形成了固定的“出现又消失”现象。',
  },
  {
    id: 'story-classroom-plant',
    title: '教室植物的魔法',
    difficulty: 'medium',
    surface:
      '教室里的多肉植物本来放在窗台上，第二天却出现在了讲台上，泥土一点都没洒。',
    bottom:
      '是值周的同学担心植物被太阳晒太多，就轻轻把它移到了讲台上，因为动作很小心，所以泥土没有洒出来，看起来像“自己移动”了。',
  },
  {
    id: 'story-backpack-notebook',
    title: '书包里的神秘笔记本',
    difficulty: 'medium',
    surface:
      '小华放学回家发现书包里多了一本画满可爱小动物的笔记本，既不是自己的也不是同学送的。',
    bottom:
      '是小华的姐姐在整理房间时，把自己小时候的笔记本误放进了小华的书包，因为姐姐的字迹和小华很像，所以小华没认出来。',
  },
  {
    id: 'story-school-gate-dog',
    title: '校门口的“定时”小狗',
    difficulty: 'medium',
    surface:
      '每天早上7点半，校门口都会出现一只黄色小狗，等同学们都进校门后它就离开了。',
    bottom:
      '这只小狗是学校附近一位老奶奶的宠物，老奶奶每天早上7点半带它出来散步，正好赶上同学们上学，等同学们都进了校门，老奶奶就带它回家了。',
  },
  {
    id: 'story-art-class-painting',
    title: '美术课的会变化的画',
    difficulty: 'hard',
    surface:
      '小美在美术课上画了一幅太阳公公，放学时还没干，第二天来学校发现画里多了一只小鸟。',
    bottom:
      '是美术老师在课后检查作业时，看到小美的画很可爱，就用自己的颜料在旁边添了一只小鸟，作为对小美认真画画的奖励。',
  },
  {
    id: 'story-math-book',
    title: '会自己翻页的数学书',
    difficulty: 'hard',
    surface:
      '小李把数学书打开放在桌上出去喝水，回来发现书自己翻到了下一页，房间里只有他一个人。',
    bottom:
      '是窗外的风吹进房间，轻轻吹动了书页，小李没注意到风，所以以为书“自己”翻页了。',
  },
  {
    id: 'story-lunchbox-surprise',
    title: '午餐盒里的惊喜',
    difficulty: 'easy',
    surface:
      '小红每天带的午餐都是妈妈做的，但有一天打开午餐盒，里面多了一颗巧克力，妈妈却说是小红自己放的。',
    bottom:
      '是小红的爸爸前一天晚上悄悄在午餐盒里放了巧克力，想给小红一个惊喜，但忘记告诉妈妈，所以妈妈以为是小红自己放的。',
  },
  {
    id: 'story-playground-ball',
    title: '操场的“会回家”的球',
    difficulty: 'medium',
    surface:
      '小朋友们在操场玩球，球滚进了灌木丛，大家没找到。第二天来学校，球又出现在了操场边的篮球架下。',
    bottom:
      '是学校的清洁工叔叔在打扫操场时，在灌木丛里发现了球，就把它放在了篮球架下，方便小朋友们找到，所以球像“自己回家”了。',
  },
  {
    id: 'story-library-bookmark',
    title: '图书馆的神奇书签',
    difficulty: 'hard',
    surface:
      '小方在图书馆借了一本书，发现里面夹着一张画着星星的书签，还书时忘了拿出来，下次再借这本书时，书签又出现了。',
    bottom:
      '这张书签是图书馆管理员专门放在书里的，每次有人还书后，管理员都会检查并把书签放回书里，所以书签总是“神奇”地出现。',
  },
];

