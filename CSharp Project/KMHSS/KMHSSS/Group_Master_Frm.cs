using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Group_Master_Frm : Form
    {
        string query, strgmid;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Group_Master_Frm()
        {
            InitializeComponent();
        }

        private void Group_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                Class_CBox.Focus();
                GM_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select GM_Id from Group_Master_Table", con);
                String GM_Id = "GMID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        GM_Id = dr[0].ToString();
                        GM_Id = GM_Id.Replace("GMID", "");
                        int no = Convert.ToInt32(GM_Id);
                        no++;
                        GM_Id = "GMID" + no.ToString();
                    }
                }
                else
                {
                    GM_Id = "GMID101";
                }
                GM_Id_Txt.Text = GM_Id;
                dr.Close();
                con.Close();
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from Group_Master_Table order by GM_ID desc";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Group_Master_dataGridView1.DataSource = dt;
                Group_Master_dataGridView1.Columns[0].HeaderText = "GM Id";
                Group_Master_dataGridView1.Columns[1].HeaderText = "GM Date";
                Group_Master_dataGridView1.Columns[2].HeaderText = "Class";
                Group_Master_dataGridView1.Columns[3].HeaderText = "GCode";
                Group_Master_dataGridView1.Columns[4].HeaderText = "Branch";
                Group_Master_dataGridView1.Columns[0].Width = 100;
                Group_Master_dataGridView1.Columns[1].Width = 100;
                Group_Master_dataGridView1.Columns[2].Width = 80;
                Group_Master_dataGridView1.Columns[3].Width = 80;
                Group_Master_dataGridView1.Columns[4].Width = 200;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                GM_Id_Txt.Text = "";
                GM_Date_Dtp.Text = "";
                Class_CBox.Text = "";
                Group_Code_Txt.Text = "";
                Branch_Txt.Text = "";
                Auto_Num();
                Class_CBox.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Add()
        {
            if (GM_Id_Txt.Text != "" && GM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Group_Code_Txt.Text != "" && Branch_Txt.Text != "")
            {
                try
                {
                    query = "Select * From Group_Master_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "'and Branch='" + Branch_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Group_Master_Table values('" + GM_Id_Txt.Text.Trim() + "','" + GM_Date_Dtp.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Group_Code_Txt.Text.Trim() + "','" + Branch_Txt.Text.Trim() + "')";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Inserted Successfully";
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (GM_Id_Txt.Text != "" && GM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Group_Code_Txt.Text != "" && Branch_Txt.Text != "")
            {
                try
                {
                    query = "update Group_Master_Table set Class='" + Class_CBox.Text.Trim() + "',Group_Code='" + Group_Code_Txt.Text.Trim() + "',Branch='" + Branch_Txt.Text.Trim() + "' where GM_Id='" + GM_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls(); 
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (GM_Id_Txt.Text != "" && GM_Date_Dtp.Text != "" && Class_CBox.Text != "" && Group_Code_Txt.Text != "" && Branch_Txt.Text != "")
            {
                try
                {
                    query = "delete Group_Master_Table where GM_Id='" + GM_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }  
        }
       
        private void Branch_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Branch_Txt.Text != "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Class_CBox.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Fill All the Fields";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Group_Code_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Group_Code_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Group_Code_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Branch_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Group_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strgmid = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                GM_Id_Txt.Text = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                GM_Date_Dtp.Text = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Class_CBox.Text = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Group_Code_Txt.Text = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Branch_Txt.Text = Group_Master_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                Class_CBox.Focus();     
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }      

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
