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
];
