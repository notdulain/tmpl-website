export interface MatchProp {
    team1: string;
    team2: string;
    group: string;
    status: string;
    toss: string;
    tossDecision: string;
  }

export interface TeamProps {
    [key: string]: string;
    name: string;
    group: string;
    member1: string;
    member2: string;
    member3: string;
    member4: string;
    member5: string;
    member6: string;
    member7: string;
    member8: string;
  }

  
 export interface InningDataProps {
    battingTeam: string;
    runs: number;
    wickets: number;
    overs: number;
    stricker: string;
    batsman1: string;
    batsman2: string;
    batsman1Runs: number;
    batsman1Balls: number;
    batsman2Runs: number;
    batsman2Balls: number;
    bowler: string;
    wides: number;
    noBals: number;
    byes: number;
    legByes: number;
    completed: boolean;
    completedAt?: number;
    recentDeliveries: string[];
  }

  export interface FinalsProp {
    l1: string;
    l2: string;
    l3: string;
    l4: string;
    r1: string;
    r2: string;
    r3: string;
    r4: string;
    ll1: string;
    ll2: string;
    rr1: string;
    rr2: string;
    winner: string;
  }
  