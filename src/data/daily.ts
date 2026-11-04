import type { DailyChaos } from '../types';
import { c } from './helpers';

/** One of these is served per calendar day, in rotation. */
export const DAILY: DailyChaos[] = [
  { id: 'd1', title: 'Wrong Chat', setup: 'You meant to text your friend “ugh my mom is SO annoying.” You sent it to your mom.', tip: 'Owning an awkward moment fast makes it shrink.', choices: [
    c('a', '“Okay that was meant for Lily. I’m frustrated about the curfew. Can we talk?”', 'reactive', 3, 'voice', 'Mom replies “lol. yes we can talk.” Crisis averted.'),
    c('b', 'Pretend your phone got hacked.', 'avoid', 0, 'voice', 'Nobody believes that. Ever.'),
    c('c', '“…new phone who dis”', 'humor', 3, 'voice', 'Mom sends “😂 ok that was funny. we do need to talk though.” The ice is broken.'),
  ] },
  { id: 'd2', title: 'Spilled Drink', setup: 'Someone bumps you in the hall and your drink spills all over your shirt.', tip: 'Most bumps are accidents. Assume that first.', choices: [
    c('a', '“Watch where you’re going!”', 'reactive', 0, 'control', 'They were already apologizing. Now they’re annoyed too.'),
    c('b', 'Take a breath. “All good, it happens.”', 'calm', 3, 'control', 'They offer you napkins and say sorry three times.'),
    c('c', '“Guess I’m wearing iced coffee today.”', 'humor', 2, 'control', 'They laugh. The moment passes.'),
  ] },
  { id: 'd3', title: 'Compliment Freeze', setup: 'Someone says “I love your shoes!” You panic.', tip: 'A simple “thank you” is a complete answer.', choices: [
    c('a', '“Oh these? They’re so old and ugly.”', 'avoid', 0, 'awareness', 'Now they feel weird for liking them.'),
    c('b', '“Thank you! They’re my favorite.”', 'calm', 3, 'voice', 'They smile. Easy.'),
    c('c', '“Thanks! Yours are cool too.”', 'calm', 3, 'empathy', 'A compliment trade. Instant connection.'),
  ] },
  { id: 'd4', title: 'Lost the Game', setup: 'You lose a close game of basketball at the park. The other team is celebrating loudly.', tip: 'How you lose says more than how you win.', choices: [
    c('a', '“Good game.” Fist bumps all around.', 'calm', 3, 'control', 'They invite you to play again tomorrow.'),
    c('b', 'Argue about the last foul call.', 'reactive', 0, 'control', 'Nobody changes their mind. Everyone leaves annoyed.'),
    c('c', 'Leave without saying anything.', 'avoid', 1, 'empathy', 'Fine, but you miss a rematch invite.'),
  ] },
  { id: 'd5', title: 'Inside Joke', setup: 'Your friends are laughing at an inside joke you don’t get.', tip: 'Asking to be let in is braver than pretending.', choices: [
    c('a', 'Fake laugh.', 'avoid', 1, 'awareness', 'You laugh. You still feel outside.'),
    c('b', '“Okay I need the backstory on this one.”', 'humor', 3, 'voice', 'They tell you. Now it’s your inside joke too.'),
    c('c', '“Must be nice to have secret jokes.”', 'reactive', 0, 'control', 'Awkward pause. Nobody explains now.'),
  ] },
  { id: 'd6', title: 'Hard No', setup: 'A friend asks to copy your homework. Again.', tip: 'Helping and doing it for them aren’t the same.', choices: [
    c('a', '“I can’t send it, but I can explain number 4.”', 'reactive', 3, 'boundaries', 'They actually get it. Next time they won’t need you.'),
    c('b', 'Send it. It’s easier.', 'avoid', 0, 'boundaries', 'The teacher notices identical answers.'),
    c('c', '“Do your own work for once.”', 'reactive', 1, 'empathy', 'Boundary held, friendship dinged.'),
  ] },
  { id: 'd7', title: 'Bad Mood Morning', setup: 'You woke up grumpy for no reason. Your friend says “good morning!!” super cheerfully.', tip: 'Naming your mood keeps it from leaking on people.', choices: [
    c('a', '“Morning. Heads up, I’m grumpy today, it’s not you.”', 'calm', 3, 'awareness', 'They bring you a snack later. That helps.'),
    c('b', '“Why are you so loud.”', 'reactive', 0, 'control', 'Their face falls. Now two people are in a bad mood.'),
    c('c', 'Ignore them.', 'avoid', 1, 'voice', 'They wonder what they did wrong.'),
  ] },
  { id: 'd8', title: 'Group Photo', setup: 'A friend posts a group pic. Everyone looks great except you, mid-blink.', tip: 'A kind ask works better than a public complaint.', choices: [
    c('a', 'Comment: “delete this immediately 😭”', 'reactive', 1, 'voice', 'Everyone sees it. They might delete it. Might not.'),
    c('b', 'DM: “Love this! Could you swap the one where my eyes are open?”', 'calm', 3, 'voice', 'They swap it in 5 minutes.'),
    c('c', 'Say nothing and feel bad about it all day.', 'avoid', 1, 'awareness', 'The pic stays up. So does the feeling.'),
  ] },
  { id: 'd9', title: 'Interrupted', setup: 'You start telling a story and someone talks over you. Again.', tip: 'A calm reclaim keeps your voice in the room.', choices: [
    c('a', '“Hold on, I wasn’t done.” (with a smile)', 'reactive', 3, 'voice', 'They laugh: “sorry, go!” Everyone listens.'),
    c('b', 'Stop talking and stay quiet the rest of lunch.', 'avoid', 0, 'voice', 'Nobody notices. That’s the problem.'),
    c('c', '“Can I finish ONE sentence please??”', 'reactive', 1, 'control', 'Point made, mood dipped.'),
  ] },
  { id: 'd10', title: 'Sub Teacher', setup: 'The class is being loud with a substitute teacher. She looks stressed.', tip: 'Empathy sometimes looks like just doing the work.', choices: [
    c('a', 'Join the chaos. It’s a sub day.', 'reactive', 0, 'empathy', 'She leaves a note for your real teacher. Everyone gets extra homework.'),
    c('b', 'Do your work and help when she asks a question.', 'calm', 3, 'empathy', 'She thanks you at the end. Small, but it matters.'),
    c('c', 'Put headphones in and zone out.', 'avoid', 1, 'empathy', 'You stay out of trouble, but you also stay out of helping.'),
  ] },
  { id: 'd11', title: 'Wrong Answer', setup: 'You answer a question in class and get it totally wrong. A few people snicker.', tip: 'Wrong answers are how learning works.', choices: [
    c('a', '“Okay, that was confidently wrong.” Then listen to the right answer.', 'humor', 3, 'control', 'People laugh with you, not at you.'),
    c('b', 'Never raise your hand again.', 'avoid', 0, 'awareness', 'One moment just made a big decision for you.'),
    c('c', 'Glare at the people laughing.', 'reactive', 1, 'control', 'They laugh more.'),
  ] },
  { id: 'd12', title: 'Birthday Forgotten', setup: 'Your friend forgot your birthday. You’re hurt.', tip: 'People can’t fix what they don’t know about.', choices: [
    c('a', '“Hey, yesterday was my birthday and I was kinda bummed you forgot.”', 'reactive', 3, 'voice', 'They feel terrible and take you for ice cream.'),
    c('b', 'Forget their birthday on purpose next time.', 'reactive', 0, 'empathy', 'Revenge doesn’t feel as good as you thought.'),
    c('c', 'Say nothing. They should’ve remembered.', 'avoid', 1, 'voice', 'They never find out, and you never get the ice cream.'),
  ] },
  { id: 'd13', title: 'Snack Thief', setup: 'Your friend keeps eating your lunch snacks without asking.', tip: 'Small boundaries prevent big blowups.', choices: [
    c('a', '“Hey, I need these today. Ask me first next time?”', 'reactive', 3, 'boundaries', '“Oh, my bad!” Fixed.'),
    c('b', 'Hide your snacks forever.', 'avoid', 1, 'voice', 'Works. Kind of a lot of effort though.'),
    c('c', '“I’m starting a snack tax. You owe me 4 granola bars.”', 'humor', 3, 'boundaries', 'They laugh, bring you one tomorrow, and start asking first.'),
  ] },
  { id: 'd14', title: 'Big Feelings', setup: 'You’re so frustrated with homework that you want to throw your laptop.', tip: 'Feelings pass faster when you name them.', choices: [
    c('a', 'Say out loud: “I’m frustrated.” Take a 5-minute walk.', 'avoid', 3, 'awareness', 'You come back and figure it out.'),
    c('b', 'Slam the laptop shut.', 'reactive', 0, 'control', 'Now you’re frustrated AND worried you broke it.'),
    c('c', 'Give up on the assignment.', 'avoid', 1, 'control', 'Short-term relief, long-term zero.'),
  ] },
  { id: 'd15', title: 'Teammate Down', setup: 'Your teammate missed the winning shot and looks crushed.', tip: 'Your words can shrink someone’s worst moment.', choices: [
    c('a', '“We wouldn’t have been in it without you.”', 'calm', 3, 'empathy', 'They look up and nod. That stays with them.'),
    c('b', '“Bro… how did you miss that.”', 'reactive', 0, 'empathy', 'They already know. Now they feel worse.'),
    c('c', 'Leave them alone.', 'avoid', 1, 'empathy', 'Sometimes space is right. Sometimes one sentence is better.'),
  ] },
  { id: 'd16', title: 'Unpopular Opinion', setup: 'Everyone at the table loves a show you think is boring.', tip: 'You can disagree without dunking.', choices: [
    c('a', '“It’s not really for me, but what do you all like about it?”', 'calm', 3, 'empathy', 'They light up explaining. You learn something.'),
    c('b', '“That show is literally so bad.”', 'reactive', 0, 'empathy', 'The table goes quiet.'),
    c('c', 'Pretend to love it.', 'avoid', 1, 'voice', 'Now they want to watch it with you every week.'),
  ] },
  { id: 'd17', title: 'Late Again', setup: 'You’re 20 minutes late meeting your friend. They’ve been waiting.', tip: 'A real apology has no “but.”', choices: [
    c('a', '“I’m really sorry. That wasn’t fair to you. Snacks on me.”', 'calm', 3, 'empathy', 'They forgive you instantly.'),
    c('b', '“Sorry, but traffic was crazy.”', 'avoid', 1, 'voice', 'Maybe true. Still sounds like an excuse.'),
    c('c', '“You’re always early, that’s on you.”', 'reactive', 0, 'empathy', 'They leave.'),
  ] },
  { id: 'd18', title: 'Asked to Lie', setup: 'A friend asks you to tell their parents they were at your house. They weren’t.', tip: 'You can be loyal without lying for someone.', choices: [
    c('a', '“I can’t lie to your parents. I hope you’re safe though, want to talk?”', 'reactive', 3, 'boundaries', 'They sigh, but they respect it.'),
    c('b', 'Lie for them.', 'avoid', 0, 'boundaries', 'Their parents call your parents. Now you’re both in trouble.'),
    c('c', '“Absolutely not, are you crazy?”', 'reactive', 1, 'empathy', 'Right answer, rough delivery.'),
  ] },
  { id: 'd19', title: 'Gift You Hate', setup: 'Your aunt gives you a sweater with a cat in sunglasses on it.', tip: 'Gratitude is about the person, not the thing.', choices: [
    c('a', '“Thank you for thinking of me!”', 'calm', 3, 'empathy', 'She beams. The sweater is a whole meme now.'),
    c('b', '“Uh… do you have the receipt?”', 'reactive', 0, 'empathy', 'Her smile disappears.'),
    c('c', '“This cat is cooler than me.”', 'humor', 3, 'empathy', 'She laughs so hard she takes a photo of you in it. Honestly, true.'),
  ] },
  { id: 'd20', title: 'Bad Haircut', setup: 'Your friend got a haircut. It’s… a choice. They ask what you think.', tip: 'Find something true and kind to say.', choices: [
    c('a', '“It’s a bold look! How do YOU feel about it?”', 'calm', 3, 'empathy', 'They admit they’re unsure. You hype them up.'),
    c('b', '“Oh no.”', 'reactive', 0, 'empathy', 'They wear a hat for two weeks.'),
    c('c', '“It’s amazing!!” (it isn’t)', 'avoid', 1, 'voice', 'They believe you. Their next haircut is worse.'),
  ] },
  { id: 'd21', title: 'Last Pick', setup: 'Teams are being picked in gym. You’re one of the last two.', tip: 'One moment doesn’t define your worth.', choices: [
    c('a', 'Shrug it off and go all in when the game starts.', 'calm', 3, 'control', 'You make a great play. People notice.'),
    c('b', 'Sulk the whole game.', 'avoid', 0, 'awareness', 'The game drags. You feel worse.'),
    c('c', '“Saving the best for last, obviously.”', 'humor', 3, 'awareness', 'Laughs. Confidence looks good on you.'),
  ] },
  { id: 'd22', title: 'Overloaded', setup: 'You have practice, a test, and a friend asking you to hang out. You’re fried.', tip: 'Saying no to one thing is saying yes to yourself.', choices: [
    c('a', '“I really want to, but I need a rest night. Saturday?”', 'avoid', 3, 'boundaries', 'They say “totally!” You sleep 9 hours.'),
    c('b', 'Say yes to everything and run on 4 hours of sleep.', 'avoid', 0, 'boundaries', 'You bomb the test. You were too tired to enjoy hanging out anyway.'),
    c('c', 'Cancel everything without explaining.', 'avoid', 1, 'voice', 'You rest, but your friend feels ditched.'),
  ] },
  { id: 'd23', title: 'Mispronounced', setup: 'A new teacher mispronounces your name in front of the class.', tip: 'Your name is worth correcting.', choices: [
    c('a', '“It’s actually pronounced {name}. Easy mistake!”', 'reactive', 3, 'voice', 'She repeats it right and thanks you.'),
    c('b', 'Let it go. Forever.', 'avoid', 1, 'voice', 'Now you answer to the wrong name all year.'),
    c('c', 'Roll your eyes loudly.', 'reactive', 0, 'control', 'She doesn’t know why you’re annoyed.'),
  ] },
  { id: 'd24', title: 'Friend Crying', setup: 'You find a friend crying in the bathroom. They say “I’m fine.”', tip: 'Being there doesn’t require the perfect words.', choices: [
    c('a', '“Okay. I’ll stay here with you for a sec anyway.”', 'calm', 3, 'empathy', 'After a minute, they start talking.'),
    c('b', '“Okay!” and leave.', 'avoid', 1, 'empathy', 'They wanted someone to stay.'),
    c('c', '“Who did this? Tell me.”', 'reactive', 1, 'empathy', 'Loyal, but they just needed calm.'),
  ] },
  { id: 'd25', title: 'Credit Stolen', setup: 'In a group meeting, someone presents your idea as theirs.', tip: 'Claim your work calmly, in the moment.', choices: [
    c('a', '“Glad you liked that idea from our chat earlier! I can add more on it.”', 'reactive', 3, 'voice', 'Everyone now knows whose idea it was. No fight needed.'),
    c('b', '“That was MY idea!”', 'reactive', 1, 'control', 'True, but it gets tense.'),
    c('c', 'Say nothing and seethe.', 'avoid', 0, 'voice', 'It happens again next week.'),
  ] },
  { id: 'd26', title: 'Mean Nickname', setup: 'Some kids start calling you a nickname you don’t like.', tip: 'A clear, calm “no” is powerful. If it keeps going, tell an adult.', choices: [
    c('a', '“Not a fan of that one. Just use my name.”', 'reactive', 3, 'boundaries', 'Most of them stop. One doesn’t, and you tell a teacher.'),
    c('b', 'Act like it doesn’t bother you even though it does.', 'avoid', 1, 'awareness', 'It sticks.'),
    c('c', 'Come up with a meaner nickname for them.', 'reactive', 0, 'control', 'Now it’s a nickname war.'),
  ] },
  { id: 'd27', title: 'Apology Ignored', setup: 'You apologized to a friend. They said “k.” That’s it.', tip: 'You can apologize. You can’t force forgiveness.', choices: [
    c('a', 'Give them space. You did your part.', 'avoid', 3, 'boundaries', 'Two days later, they text you like normal.'),
    c('b', 'Apologize five more times.', 'avoid', 1, 'control', 'They feel pressured.'),
    c('c', '“Wow, I said sorry, what else do you want?”', 'reactive', 0, 'empathy', 'That undoes the apology.'),
  ] },
  { id: 'd28', title: 'Wrong Order', setup: 'The café gets your order wrong. The worker looks exhausted.', tip: 'Kindness to workers is a superpower.', choices: [
    c('a', '“Hey, I think this might be the wrong one, no rush though!”', 'calm', 3, 'empathy', 'They fix it and add a cookie.'),
    c('b', '“This is wrong. Can you not read?”', 'reactive', 0, 'empathy', 'Nobody has a good day after that.'),
    c('c', 'Drink it anyway, annoyed.', 'avoid', 1, 'voice', 'You hate oat milk.'),
  ] },
  { id: 'd29', title: 'Hype Check', setup: 'Your friend just got into the program you both applied for. You didn’t.', tip: 'You can be happy for them and sad for you.', choices: [
    c('a', '“I’m really happy for you. And honestly kinda bummed for me.”', 'calm', 3, 'awareness', 'They hug you. Both things are true.'),
    c('b', '“Must be nice.”', 'reactive', 0, 'empathy', 'Their big moment just got smaller.'),
    c('c', 'Congratulate them and then avoid them for a week.', 'avoid', 1, 'voice', 'They think you’re mad at them.'),
  ] },
  { id: 'd30', title: 'Thank You Note', setup: 'A teacher stayed after school to help you. You passed the test.', tip: 'Gratitude makes people want to help again.', choices: [
    c('a', 'Tell them: “I passed! Thanks for staying late to help.”', 'calm', 3, 'empathy', 'They light up. Teachers remember that.'),
    c('b', 'Say nothing. It’s their job.', 'avoid', 1, 'empathy', 'True, but you missed an easy win.'),
    c('c', 'Leave a thank-you sticky note on their desk.', 'calm', 3, 'empathy', 'It stays on their desk for the rest of the year.'),
  ] },
];
