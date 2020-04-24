import React from 'react';
import { Typography, Layout } from 'antd';

const { Text, Title } = Typography;
const { Content } = Layout;

export default class Footer extends React.Component {

       render() {
         return (
            <div ref={this.props.location}>
              <Layout className="footer_div">
                <div style={{maxWidth: 800, margin: 'auto'}}>
                  <Title level={2}> A League of Legends Genetic Algorithm </Title>
                </div>
                <Content className="info_div" style={{margin: 'auto'}}>
                  <Title level={3}> The Importance of Counter Picking </Title>
                  <Text>
                    League of Legends (LoL) is a prominent Multiplayer Online Battle Arena (MOBA) game with over 115 million active monthly players reported as of 2019. Players are split into two teams of five with the objective of destroying the other team’s base first. Each player controls one of 148 unique champions for the duration of the game. The 5 unique champions piloted by each team are known as the team composition, and it is a pivotal strategy in competitive games. Champions are known to perform well against some, and poorly against others. Similarly, champions have synergies that augment their respective strengths when played together. As a result, team compositions have a huge impact on the results of a game. Therefore, not only is it important to pick the best possible champions, but it is also important to pick champions that perform well against the other team’s team composition.
                    <br/>
                    <br/>
                    Costa et al. proposed a genetic algorithm aimed at creating team compositions based on a team’s predetermined game focused strategy in which individuals (a team composition) had their fitness function calculated according to how well their team performed according to a specific strategy [1]. Our proposal is to take this approach and augment it such that a team is optimized according to how well it can perform against another team composition. This problem is hard to solve with a standard search-based algorithm due to the volume of total possible team compositions that can be made. Given a standard combination calculation in which the number of objects is equal to the number of champions in the game, 148 at the time of writing, and sample size of 5 for the size of the team, there are a total of 552,689,424 different possible teams.
                  </Text>


                  <Title level={3}> What do we propose? </Title>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="given_team"
                      src={require('../images/given_team.png')}/>
                  </div>
                  <Text>
                  Genetic Algorithms simulate natural selection as a method to find optimized solutions over a large search space. A random population of individuals are provided with a set of properties. These properties can be mutated or traded between individuals across each iteration, or generation. A fitness function is then used to objectively evaluate the strength of each individual, and the strongest carry on to the next generation. We built a genetic algorithm as a way to determine the best possible team composition to counter a given team.
                  </Text>

                  <Title level={3}> How does it work? </Title>
                  <Text>
                    The individuals in this problem are randomly selected team compositions. Each team composition has five champions, each with their own unique statistics against all other champions in the game. These team compositions are evaluated on their performance against the given team composition, taking win rates and the number of games played into consideration to produce a confidence score against the given team. The higher the confidence, the higher the fitness score.
                    <br/>
                  </Text>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="generated_teams"
                      src={require('../images/generated_teams.png')}/>
                  </div>
                  <Text>
                    <br/>
                    A single generation is broken down into 4 key steps: crossover, mutation, fitness calculations, and selection.
                  </Text>

                  <Title level={4}>
                    Crossover
                  </Title>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="crossover"
                      src={require('../images/crossover.png')}/>
                  </div>
                  <Text>
                    To create the new generation of individuals, “parents” pair together to produce “children” which inherit traits from both parents. When crossing over our team compositions, A single champion from both parents swap place, creating two new team compositions.
                  </Text>

                  <Title level={4}>
                    Mutation
                  </Title>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="mutation"
                      src={require('../images/mutation.png')}/>
                  </div>
                  <Text>
                    Mutations serve as a way to explore the search space and maintain genetic diversity within the population. When a team composition is mutated, a random champion is replaced with a new champion. Doing so enables the algorithm to find more unique team compositions that might perform better than the current best composition.
                  </Text>

                  <Title level={4}>
                    Fitness
                  </Title>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="fitness_function"
                      src={require('../images/fitness_function.png')}/>
                  </div>
                  <Text>
                    A team composition’s fitness is a calculation of the performance of each champion against all champions in the given team composition. Each champion’s performance is calculated using the Wilson score interval with a confidence of 95%. This results in an improved normalized probability that considers both the champion’s win rate and the number of games played against that champion in its calculation. The overall fitness is the average of all confidence calculations for each champion.
                  </Text>

                  <Title level={4}>
                    Selection
                  </Title>
                  <div style={{textAlign: 'center'}}>
                    <img
                      className="footer_image"
                      alt="selection"
                      src={require('../images/selection.png')}/>
                  </div>
                  <Text>
                    Only a portion of the existing population is carried on to the next generation. Team compositions are selected based on their fitness calculated in the prior step. Two individuals in the population are randomly chosen, and the stronger of the two is selected for the next generation. However, both individuals can be picked again in the selection process, so the weaker one has a chance of being selected for the next generation. Likewise, the stronger individual can have more than one copy in the next generation as well.
                  </Text>

                  <Title level={3}> How does it perform? </Title>
                  <Text>
                    Pretty well! More details to come. 
                  </Text>

                  <Title level={3}> Current Shortcomings </Title>
                  <Text>
                    The biggest shortcoming is the limited amount of game data captured. Game information data was collected with the help of other third party developers such as myself. This data was a one time data dump and does not update dynamically from patch to patach. As it gets more popular, this is something I would love to implement in the future.
                  </Text>
                </Content>
              </Layout>
            </div>
         )}
}
